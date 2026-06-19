"use client";

import { useMemo, useState } from "react";
import type { Lead, LeadStatus } from "../data/leads-store";

type LeadInboxPanelProps = {
  initialLeads: Lead[];
};

type SaveStatus = {
  tone: "idle" | "success" | "error";
  text: string;
};

const statusLabels: Record<LeadStatus, string> = {
  closed: "Kapandı",
  contacted: "İletişime geçildi",
  new: "Yeni",
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const getContactHref = (contact: string) => {
  if (contact.includes("@")) {
    return `mailto:${contact}`;
  }

  const phone = contact.replace(/\D/g, "");

  return phone ? `tel:${phone}` : "";
};

export function LeadInboxPanel({ initialLeads }: LeadInboxPanelProps) {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLeadId, setSelectedLeadId] = useState(initialLeads[0]?.id ?? "");
  const [filter, setFilter] = useState<LeadStatus | "">("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<SaveStatus>({
    tone: "idle",
    text: "Talep kutusu hazır",
  });
  const visibleLeads = useMemo(
    () => leads.filter((lead) => (filter ? lead.status === filter : true)),
    [filter, leads],
  );
  const selectedLead =
    leads.find((lead) => lead.id === selectedLeadId) ??
    visibleLeads[0] ??
    leads[0];
  const stats = useMemo(
    () => ({
      closed: leads.filter((lead) => lead.status === "closed").length,
      contacted: leads.filter((lead) => lead.status === "contacted").length,
      new: leads.filter((lead) => lead.status === "new").length,
      total: leads.length,
    }),
    [leads],
  );

  const refreshLeads = async () => {
    setBusy(true);
    setStatus({ tone: "idle", text: "Talepler yenileniyor..." });

    try {
      const response = await fetch("/api/admin/leads", {
        cache: "no-store",
      });
      const body = (await response.json()) as {
        leads?: Lead[];
        message?: string;
      };

      if (!response.ok || !body.leads) {
        throw new Error(body.message || "Talepler yüklenemedi.");
      }

      setLeads(body.leads);
      setSelectedLeadId(body.leads[0]?.id ?? "");
      setStatus({ tone: "success", text: "Talepler yenilendi" });
    } catch (error) {
      const refreshError = error as Error;
      setStatus({
        tone: "error",
        text: refreshError.message || "Talepler yüklenemedi.",
      });
    } finally {
      setBusy(false);
    }
  };

  const updateLeadStatus = async (leadId: string, nextStatus: LeadStatus) => {
    setBusy(true);
    setStatus({ tone: "idle", text: "Talep güncelleniyor..." });

    try {
      const response = await fetch("/api/admin/leads", {
        body: JSON.stringify({ id: leadId, status: nextStatus }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
      const body = (await response.json()) as {
        lead?: Lead;
        message?: string;
      };

      if (!response.ok || !body.lead) {
        throw new Error(body.message || "Talep güncellenemedi.");
      }

      setLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead.id === body.lead?.id ? body.lead : lead,
        ),
      );
      setStatus({ tone: "success", text: "Talep güncellendi" });
    } catch (error) {
      const updateError = error as Error;
      setStatus({
        tone: "error",
        text: updateError.message || "Talep güncellenemedi.",
      });
    } finally {
      setBusy(false);
    }
  };

  const deleteLead = async (leadId: string) => {
    const confirmed = window.confirm("Bu talep silinsin mi?");

    if (!confirmed) {
      return;
    }

    setBusy(true);
    setStatus({ tone: "idle", text: "Talep siliniyor..." });

    try {
      const response = await fetch("/api/admin/leads", {
        body: JSON.stringify({ id: leadId }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      const body = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(body.message || "Talep silinemedi.");
      }

      setLeads((currentLeads) =>
        currentLeads.filter((lead) => lead.id !== leadId),
      );
      setSelectedLeadId("");
      setStatus({ tone: "success", text: "Talep silindi" });
    } catch (error) {
      const deleteError = error as Error;
      setStatus({
        tone: "error",
        text: deleteError.message || "Talep silinemedi.",
      });
    } finally {
      setBusy(false);
    }
  };

  const resetLeads = async () => {
    const confirmed = window.confirm("Tüm numune talepleri temizlensin mi?");

    if (!confirmed) {
      return;
    }

    setBusy(true);
    setStatus({ tone: "idle", text: "Talepler temizleniyor..." });

    try {
      const response = await fetch("/api/admin/leads", {
        body: JSON.stringify({ action: "reset" }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const body = (await response.json()) as {
        leads?: Lead[];
        message?: string;
      };

      if (!response.ok || !body.leads) {
        throw new Error(body.message || "Talepler temizlenemedi.");
      }

      setLeads(body.leads);
      setSelectedLeadId("");
      setStatus({ tone: "success", text: "Talepler temizlendi" });
    } catch (error) {
      const resetError = error as Error;
      setStatus({
        tone: "error",
        text: resetError.message || "Talepler temizlenemedi.",
      });
    } finally {
      setBusy(false);
    }
  };

  const exportLeads = () => {
    const blob = new Blob([`${JSON.stringify(leads, null, 2)}\n`], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "adem-eren-sample-requests.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus({ tone: "success", text: "Talepler dışa aktarıldı" });
  };

  return (
    <section className="admin-panel admin-leads-panel">
      <aside className="admin-sidebar">
        <div className="admin-section-title compact">
          <p className="eyebrow">Talepler</p>
          <h2>Numune talepleri</h2>
        </div>

        <div className="admin-stat-grid">
          <article>
            <span>{stats.total}</span>
            <p>Toplam talep</p>
          </article>
          <article className={stats.new > 0 ? "is-online" : ""}>
            <span>{stats.new}</span>
            <p>Yeni</p>
          </article>
          <article>
            <span>{stats.contacted}</span>
            <p>İletişime geçildi</p>
          </article>
          <article>
            <span>{stats.closed}</span>
            <p>Kapandı</p>
          </article>
        </div>

        <div className="admin-toolbar admin-toolbar-compact">
          <button disabled={busy} onClick={refreshLeads} type="button">
            Yenile
          </button>
          <button onClick={exportLeads} type="button">
            JSON dışa aktar
          </button>
          <button disabled={busy || leads.length === 0} onClick={resetLeads} type="button">
            Temizle
          </button>
        </div>

        <div className="admin-list-filters">
          <label>
            Durum
            <select
              onChange={(event) => setFilter(event.target.value as LeadStatus | "")}
              value={filter}
            >
              <option value="">Tüm talepler</option>
              <option value="new">Yeni</option>
              <option value="contacted">İletişime geçildi</option>
              <option value="closed">Kapandı</option>
            </select>
          </label>
        </div>

        <div className="admin-product-list admin-lead-list">
          {visibleLeads.length > 0 ? (
            visibleLeads.map((lead) => (
              <button
                className={lead.id === selectedLead?.id ? "is-active" : ""}
                key={lead.id}
                onClick={() => setSelectedLeadId(lead.id)}
                type="button"
              >
                <span>{statusLabels[lead.status]}</span>
                <strong>{lead.name}</strong>
                <small>{lead.collection || lead.contact}</small>
              </button>
            ))
          ) : (
            <p className="admin-list-empty">Henüz numune talebi yok.</p>
          )}
        </div>
      </aside>

      <div className="admin-editor">
        <div className={`admin-status is-${status.tone}`}>
          <span>{status.text}</span>
          <strong>{selectedLead ? selectedLead.name : "Talep seçilmedi"}</strong>
        </div>

        {selectedLead ? (
          <>
            <div className="admin-lead-detail-card">
              <div>
                <p className="eyebrow">{statusLabels[selectedLead.status]}</p>
                <h3>{selectedLead.name}</h3>
                <span>{formatDate(selectedLead.createdAt)}</span>
              </div>
              <dl>
                <div>
                  <dt>İletişim</dt>
                  <dd>
                    {getContactHref(selectedLead.contact) ? (
                      <a href={getContactHref(selectedLead.contact)}>
                        {selectedLead.contact}
                      </a>
                    ) : (
                      selectedLead.contact
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Koleksiyon</dt>
                  <dd>{selectedLead.collection || "-"}</dd>
                </div>
                <div>
                  <dt>Dil</dt>
                  <dd>{selectedLead.language.toUpperCase()}</dd>
                </div>
                <div>
                  <dt>Kaynak</dt>
                  <dd>{selectedLead.sourcePath}</dd>
                </div>
                {selectedLead.productCode ? (
                  <div>
                    <dt>Ürün</dt>
                    <dd>
                      {selectedLead.productCode} {selectedLead.productName}
                    </dd>
                  </div>
                ) : null}
              </dl>
              <p>{selectedLead.message || "Mesaj eklenmemiş."}</p>
            </div>

            <div className="admin-editor-links">
              <button
                disabled={busy || selectedLead.status === "new"}
                onClick={() => updateLeadStatus(selectedLead.id, "new")}
                type="button"
              >
                Yeni olarak işaretle
              </button>
              <button
                disabled={busy || selectedLead.status === "contacted"}
                onClick={() => updateLeadStatus(selectedLead.id, "contacted")}
                type="button"
              >
                İletişime geçildi yap
              </button>
              <button
                disabled={busy || selectedLead.status === "closed"}
                onClick={() => updateLeadStatus(selectedLead.id, "closed")}
                type="button"
              >
                Kapandı yap
              </button>
              <button
                disabled={busy}
                onClick={() => deleteLead(selectedLead.id)}
                type="button"
              >
                Talebi sil
              </button>
            </div>
          </>
        ) : (
          <section className="admin-empty-state">
            <h2>Henüz numune talebi yok</h2>
            <p>Web sitesi formundan gelen yeni talepler burada görünecek.</p>
          </section>
        )}
      </div>
    </section>
  );
}

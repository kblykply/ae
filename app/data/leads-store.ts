import { promises as fs } from "node:fs";
import path from "node:path";

export type LeadStatus = "new" | "contacted" | "closed";

export type Lead = {
  contact: string;
  collection: string;
  createdAt: string;
  id: string;
  language: string;
  message: string;
  name: string;
  productCode: string;
  productName: string;
  sourcePath: string;
  status: LeadStatus;
  updatedAt: string;
};

export type LeadInput = Partial<
  Pick<
    Lead,
    | "contact"
    | "collection"
    | "language"
    | "message"
    | "name"
    | "productCode"
    | "productName"
    | "sourcePath"
  >
>;

const leadsFilePath = path.join(process.cwd(), "data", "leads.json");
const backendBaseUrl = (process.env.BACKEND_URL ?? "").replace(/\/$/, "");
const backendAdminToken =
  process.env.BACKEND_ADMIN_TOKEN ??
  process.env.ADMIN_PASSWORD ??
  "ademeren-admin";
const leadStatuses: LeadStatus[] = ["new", "contacted", "closed"];

const getBackendEndpoint = (pathname: string) =>
  backendBaseUrl ? `${backendBaseUrl}${pathname}` : "";

const toText = (value: unknown, fallback = "", maxLength = 1200) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : fallback;

const createLeadId = () =>
  `lead-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

const toIsoDate = (value: unknown, fallback: string) => {
  const parsed = typeof value === "string" ? Date.parse(value) : NaN;

  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : fallback;
};

export function normalizeLead(value: unknown, index = 0): Lead {
  const candidate = value as Partial<Lead> | undefined;
  const createdAt = toIsoDate(candidate?.createdAt, new Date().toISOString());
  const updatedAt = toIsoDate(candidate?.updatedAt, createdAt);
  const status = leadStatuses.includes(candidate?.status as LeadStatus)
    ? (candidate?.status as LeadStatus)
    : "new";

  return {
    contact: toText(candidate?.contact, "", 180),
    collection: toText(candidate?.collection, "", 220),
    createdAt,
    id: toText(candidate?.id, `lead-${index + 1}`, 120),
    language: toText(candidate?.language, "tr", 12),
    message: toText(candidate?.message, "", 2000),
    name: toText(candidate?.name, "Site ziyaretçisi", 180),
    productCode: toText(candidate?.productCode, "", 80),
    productName: toText(candidate?.productName, "", 220),
    sourcePath: toText(candidate?.sourcePath, "/", 300),
    status,
    updatedAt,
  };
}

export function normalizeLeads(value: unknown): Lead[] {
  return (Array.isArray(value) ? value : [])
    .map((lead, index) => normalizeLead(lead, index))
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

const validateLeadInput = (input: LeadInput) => {
  const name = toText(input.name, "", 180);
  const contact = toText(input.contact, "", 180);

  if (!name || !contact) {
    throw new Error("Ad ve iletişim bilgisi zorunludur.");
  }

  return {
    contact,
    collection: toText(input.collection, "", 220),
    language: toText(input.language, "tr", 12),
    message: toText(input.message, "", 2000),
    name,
    productCode: toText(input.productCode, "", 80),
    productName: toText(input.productName, "", 220),
    sourcePath: toText(input.sourcePath, "/", 300),
  };
};

async function readLocalLeads() {
  try {
    const file = await fs.readFile(leadsFilePath, "utf8");

    return normalizeLeads(JSON.parse(file));
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException;

    if (fileError.code !== "ENOENT") {
      console.warn("Boş talep yedeği kullanılıyor:", fileError.message);
    }

    return [];
  }
}

async function writeLocalLeads(leads: Lead[]) {
  const normalizedLeads = normalizeLeads(leads);

  await fs.mkdir(path.dirname(leadsFilePath), { recursive: true });
  await fs.writeFile(
    leadsFilePath,
    `${JSON.stringify(normalizedLeads, null, 2)}\n`,
    "utf8",
  );

  return normalizedLeads;
}

export async function getManagedLeads() {
  const endpoint = getBackendEndpoint("/api/leads");

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        cache: "no-store",
        headers: {
          "x-admin-token": backendAdminToken,
        },
      });
      const payload = (await response.json()) as {
        leads?: unknown;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(payload.message || `Sunucu ${response.status} döndürdü`);
      }

      return normalizeLeads(payload.leads);
    } catch (error) {
      const backendError = error as Error;
      console.warn("Yerel taleplere geçiliyor:", backendError.message);
    }
  }

  return readLocalLeads();
}

export async function createManagedLead(input: LeadInput) {
  const leadInput = validateLeadInput(input);
  const endpoint = getBackendEndpoint("/api/leads");

  if (endpoint) {
    const response = await fetch(endpoint, {
      body: JSON.stringify({ lead: leadInput }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const payload = (await response.json()) as {
      lead?: unknown;
      message?: string;
    };

    if (!response.ok) {
      throw new Error(payload.message || `Sunucu ${response.status} döndürdü`);
    }

    return normalizeLead(payload.lead);
  }

  const now = new Date().toISOString();
  const lead = normalizeLead({
    ...leadInput,
    createdAt: now,
    id: createLeadId(),
    status: "new",
    updatedAt: now,
  });
  const leads = await readLocalLeads();
  await writeLocalLeads([lead, ...leads]);

  return lead;
}

export async function updateManagedLeadStatus(
  leadId: string,
  status: LeadStatus,
) {
  const endpoint = getBackendEndpoint(`/api/leads/${encodeURIComponent(leadId)}`);

  if (endpoint) {
    const response = await fetch(endpoint, {
      body: JSON.stringify({ status }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": backendAdminToken,
      },
      method: "PUT",
    });
    const payload = (await response.json()) as {
      lead?: unknown;
      message?: string;
    };

    if (!response.ok) {
      throw new Error(payload.message || `Sunucu ${response.status} döndürdü`);
    }

    return normalizeLead(payload.lead);
  }

  const leads = await readLocalLeads();
  const existingLead = leads.find((lead) => lead.id === leadId);

  if (!existingLead) {
    throw new Error("Talep bulunamadı");
  }

  const nextLead = normalizeLead({
    ...existingLead,
    status,
    updatedAt: new Date().toISOString(),
  });
  await writeLocalLeads(
    leads.map((lead) => (lead.id === leadId ? nextLead : lead)),
  );

  return nextLead;
}

export async function deleteManagedLead(leadId: string) {
  const endpoint = getBackendEndpoint(`/api/leads/${encodeURIComponent(leadId)}`);

  if (endpoint) {
    const response = await fetch(endpoint, {
      cache: "no-store",
      headers: {
        "x-admin-token": backendAdminToken,
      },
      method: "DELETE",
    });
    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      throw new Error(payload.message || `Sunucu ${response.status} döndürdü`);
    }

    return;
  }

  const leads = await readLocalLeads();
  const nextLeads = leads.filter((lead) => lead.id !== leadId);

  if (nextLeads.length === leads.length) {
    throw new Error("Talep bulunamadı");
  }

  await writeLocalLeads(nextLeads);
}

export async function resetManagedLeads() {
  const endpoint = getBackendEndpoint("/api/leads/reset");

  if (endpoint) {
    const response = await fetch(endpoint, {
      body: JSON.stringify({ action: "reset" }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": backendAdminToken,
      },
      method: "POST",
    });
    const payload = (await response.json()) as {
      leads?: unknown;
      message?: string;
    };

    if (!response.ok) {
      throw new Error(payload.message || `Sunucu ${response.status} döndürdü`);
    }

    return normalizeLeads(payload.leads);
  }

  return writeLocalLeads([]);
}

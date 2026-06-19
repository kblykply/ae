import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../admin/auth";
import {
  deleteManagedLead,
  getManagedLeads,
  resetManagedLeads,
  updateManagedLeadStatus,
  type LeadStatus,
} from "../../../data/leads-store";

export const dynamic = "force-dynamic";

const unauthorized = () =>
  NextResponse.json({ message: "Yetkisiz erişim" }, { status: 401 });

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  try {
    const leads = await getManagedLeads();

    return NextResponse.json({ leads });
  } catch (error) {
    const leadsError = error as Error;

    return NextResponse.json(
      { message: leadsError.message || "Talepler yüklenemedi." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  try {
    const body = (await request.json()) as {
      id?: string;
      status?: LeadStatus;
    };

    if (!body.id || !body.status) {
      return NextResponse.json(
        { message: "Talep id ve durum bilgisi zorunludur." },
        { status: 400 },
      );
    }

    const lead = await updateManagedLeadStatus(body.id, body.status);

    return NextResponse.json({
      lead,
      message: "Talep güncellendi",
    });
  } catch (error) {
    const leadsError = error as Error;

    return NextResponse.json(
      { message: leadsError.message || "Talep güncellenemedi." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  try {
    const body = (await request.json()) as { id?: string };

    if (!body.id) {
      return NextResponse.json(
        { message: "Talep id bilgisi zorunludur." },
        { status: 400 },
      );
    }

    await deleteManagedLead(body.id);

    return NextResponse.json({ message: "Talep silindi" });
  } catch (error) {
    const leadsError = error as Error;

    return NextResponse.json(
      { message: leadsError.message || "Talep silinemedi." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  try {
    const body = (await request.json()) as { action?: string };

    if (body.action !== "reset") {
      return NextResponse.json(
        { message: "Bilinmeyen talep işlemi" },
        { status: 400 },
      );
    }

    const leads = await resetManagedLeads();

    return NextResponse.json({
      leads,
      message: "Talepler temizlendi",
    });
  } catch (error) {
    const leadsError = error as Error;

    return NextResponse.json(
      { message: leadsError.message || "Talepler temizlenemedi." },
      { status: 500 },
    );
  }
}

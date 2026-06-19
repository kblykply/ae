import { NextResponse } from "next/server";
import {
  createManagedLead,
  type LeadInput,
} from "../../data/leads-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadInput;
    const lead = await createManagedLead(body);

    return NextResponse.json(
      {
        lead,
        message: "Numune talebi alındı",
      },
      { status: 201 },
    );
  } catch (error) {
    const leadError = error as Error;
    const status = leadError.message.includes("zorunludur") ? 400 : 500;

    return NextResponse.json(
      {
        message:
          leadError.message ||
          "Numune talebi gönderilemedi. Lütfen WhatsApp üzerinden deneyin.",
      },
      { status },
    );
  }
}

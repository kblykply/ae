import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../admin/auth";
import { getCatalogConnectionStatus } from "../../../data/catalog-store";

export const dynamic = "force-dynamic";

const unauthorized = () =>
  NextResponse.json({ message: "Yetkisiz erişim" }, { status: 401 });

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  const status = await getCatalogConnectionStatus();

  return NextResponse.json(status, {
    status: status.ok ? 200 : 503,
  });
}

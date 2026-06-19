import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../admin/auth";
import {
  getManagedSiteContent,
  resetManagedSiteContent,
  saveManagedSiteContent,
} from "../../../data/site-content";

export const dynamic = "force-dynamic";

const unauthorized = () =>
  NextResponse.json({ message: "Yetkisiz erişim" }, { status: 401 });

const refreshSiteContentPages = () => {
  revalidatePath("/");
  revalidatePath("/admin");
};

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  const siteContent = await getManagedSiteContent();

  return NextResponse.json({ siteContent });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  try {
    const body = (await request.json()) as { siteContent?: unknown };
    const siteContent = await saveManagedSiteContent(body.siteContent);

    refreshSiteContentPages();

    return NextResponse.json({
      message: "Site içeriği kaydedildi",
      siteContent,
    });
  } catch (error) {
    const contentError = error as Error;

    return NextResponse.json(
      {
        message: contentError.message || "Site içeriği kaydedilemedi.",
      },
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
        { message: "Bilinmeyen site içeriği işlemi" },
        { status: 400 },
      );
    }

    const siteContent = await resetManagedSiteContent();
    refreshSiteContentPages();

    return NextResponse.json({
      message: "Site içeriği sıfırlandı",
      siteContent,
    });
  } catch (error) {
    const contentError = error as Error;

    return NextResponse.json(
      {
        message: contentError.message || "Site içeriği sıfırlanamadı.",
      },
      { status: 500 },
    );
  }
}

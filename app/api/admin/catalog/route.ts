import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../admin/auth";
import {
  getManagedProducts,
  resetManagedProducts,
  saveManagedProducts,
} from "../../../data/catalog-store";
import { productCategories } from "../../../data/products";

export const dynamic = "force-dynamic";

const unauthorized = () =>
  NextResponse.json({ message: "Yetkisiz erişim" }, { status: 401 });

const refreshCatalogPages = () => {
  revalidatePath("/");
  revalidatePath("/search");
  revalidatePath("/category/[category]", "page");
  revalidatePath("/products/[slug]", "page");
};

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  const products = await getManagedProducts();

  return NextResponse.json({
    categories: productCategories,
    products,
  });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  try {
    const body = (await request.json()) as { products?: unknown };
    const savedProducts = await saveManagedProducts(
      Array.isArray(body.products) ? body.products : [],
    );

    refreshCatalogPages();

    return NextResponse.json({
      message: "Katalog kaydedildi",
      products: savedProducts,
    });
  } catch (error) {
    const catalogError = error as Error;

    return NextResponse.json(
      {
        message:
          catalogError.message ||
          "Katalog kaydedilemedi. Sunucu depolama izinlerini kontrol edin.",
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
        { message: "Bilinmeyen katalog işlemi" },
        { status: 400 },
      );
    }

    const products = await resetManagedProducts();
    refreshCatalogPages();

    return NextResponse.json({
      message: "Katalog sıfırlandı",
      products,
    });
  } catch (error) {
    const catalogError = error as Error;

    return NextResponse.json(
      {
        message:
          catalogError.message ||
          "Katalog sıfırlanamadı. Sunucu depolama izinlerini kontrol edin.",
      },
      { status: 500 },
    );
  }
}

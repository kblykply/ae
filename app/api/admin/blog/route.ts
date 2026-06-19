import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../admin/auth";
import {
  getManagedBlogPosts,
  resetManagedBlogPosts,
  saveManagedBlogPosts,
} from "../../../data/blog-posts";

export const dynamic = "force-dynamic";

const unauthorized = () =>
  NextResponse.json({ message: "Yetkisiz erişim" }, { status: 401 });

const refreshBlogPages = () => {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/sitemap.xml");
};

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  const posts = await getManagedBlogPosts({ includeDrafts: true });

  return NextResponse.json({ posts });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  try {
    const body = (await request.json()) as { posts?: unknown };
    const savedPosts = await saveManagedBlogPosts(
      Array.isArray(body.posts) ? body.posts : [],
    );

    refreshBlogPages();

    return NextResponse.json({
      message: "Blog yazıları kaydedildi",
      posts: savedPosts,
    });
  } catch (error) {
    const blogError = error as Error;

    return NextResponse.json(
      {
        message:
          blogError.message ||
          "Blog yazıları kaydedilemedi. Sunucu depolama izinlerini kontrol edin.",
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
        { message: "Bilinmeyen blog işlemi" },
        { status: 400 },
      );
    }

    const posts = await resetManagedBlogPosts();
    refreshBlogPages();

    return NextResponse.json({
      message: "Blog yazıları başlangıç içeriklerine döndürüldü",
      posts,
    });
  } catch (error) {
    const blogError = error as Error;

    return NextResponse.json(
      {
        message:
          blogError.message ||
          "Blog yazıları sıfırlanamadı. Sunucu depolama izinlerini kontrol edin.",
      },
      { status: 500 },
    );
  }
}

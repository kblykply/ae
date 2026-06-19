import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../admin/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const maxUploadSize = 6 * 1024 * 1024;
const uploadRootDirectory = path.join(process.cwd(), "public", "uploads");
const backendBaseUrl = (process.env.BACKEND_URL ?? "").replace(/\/$/, "");
const backendAdminToken =
  process.env.BACKEND_ADMIN_TOKEN ??
  process.env.ADMIN_TOKEN ??
  process.env.ADMIN_PASSWORD ??
  "ademeren-admin";
const allowedExtensions = new Set(["avif", "gif", "jpg", "jpeg", "png", "webp"]);
const extensionByMime: Record<string, string> = {
  "image/avif": "avif",
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const unauthorized = () =>
  NextResponse.json({ message: "Yetkisiz erişim" }, { status: 401 });

const sanitizeFileName = (value: string) =>
  value
    .toLocaleLowerCase("tr")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

const getUploadExtension = (file: File) => {
  const mimeExtension = extensionByMime[file.type];

  if (mimeExtension) {
    return mimeExtension;
  }

  const fileExtension = path.extname(file.name).replace(".", "").toLowerCase();

  return allowedExtensions.has(fileExtension) ? fileExtension : "";
};

const uploadToBackend = async (
  file: File,
  fileBuffer: Buffer,
  folder: string,
) => {
  if (!backendBaseUrl) {
    return null;
  }

  const response = await fetch(`${backendBaseUrl}/api/uploads`, {
    body: JSON.stringify({
      contentType: file.type,
      data: fileBuffer.toString("base64"),
      fileName: file.name,
      folder,
    }),
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": backendAdminToken,
    },
    method: "POST",
  });
  const payload = (await response.json()) as {
    message?: string;
    url?: string;
  };

  if (!response.ok || !payload.url) {
    throw new Error(payload.message || "Görsel backend'e yüklenemedi.");
  }

  return payload;
};

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Yüklenecek görsel bulunamadı." },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Lütfen bir görsel dosyası seçin." },
        { status: 400 },
      );
    }

    if (file.size <= 0 || file.size > maxUploadSize) {
      return NextResponse.json(
        { message: "Görsel boyutu 6 MB altında olmalı." },
        { status: 400 },
      );
    }

    const extension = getUploadExtension(file);

    if (!extension) {
      return NextResponse.json(
        { message: "Desteklenen formatlar: JPG, PNG, WebP, AVIF veya GIF." },
        { status: 400 },
      );
    }

    const sourceName = path.basename(file.name, path.extname(file.name));
    const safeName = sanitizeFileName(sourceName) || "urun-gorseli";
    const folder = sanitizeFileName(String(formData.get("folder") || "")) ||
      "products";
    const fileName = `${safeName}-${randomUUID()}.${extension}`;
    const uploadDirectory = path.join(uploadRootDirectory, folder);
    const targetPath = path.join(uploadDirectory, fileName);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const backendUpload = await uploadToBackend(file, fileBuffer, folder);

    if (backendUpload) {
      return NextResponse.json({
        message: backendUpload.message || "Görsel yüklendi",
        url: backendUpload.url,
      });
    }

    await fs.mkdir(uploadDirectory, { recursive: true });
    await fs.writeFile(targetPath, fileBuffer);

    return NextResponse.json({
      message: "Görsel yüklendi",
      url: `/uploads/${folder}/${fileName}`,
    });
  } catch (error) {
    const uploadError = error as Error;

    return NextResponse.json(
      {
        message:
          uploadError.message ||
          "Görsel yüklenemedi. Sunucu dosya izinlerini kontrol edin.",
      },
      { status: 500 },
    );
  }
}

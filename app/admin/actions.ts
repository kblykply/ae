"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminCookieName,
  getAdminPassword,
  getAdminSessionValue,
} from "./auth";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const adminPassword = getAdminPassword();

  if (!adminPassword || password !== adminPassword) {
    redirect("/admin?error=invalid");
  }

  const sessionValue = getAdminSessionValue();

  if (!sessionValue) {
    redirect("/admin?error=invalid");
  }

  const cookieStore = await cookies();
  cookieStore.set(adminCookieName, sessionValue, {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);

  redirect("/admin");
}

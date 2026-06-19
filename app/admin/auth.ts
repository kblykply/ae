import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export const adminCookieName = "ae_admin_session";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || null;
}

export function getAdminSessionValue() {
  const adminPassword = getAdminPassword();

  if (!adminPassword) {
    return null;
  }

  return createHash("sha256")
    .update(`adem-eren-decoration:${adminPassword}`)
    .digest("hex");
}

export async function isAdminAuthenticated() {
  const sessionValue = getAdminSessionValue();

  if (!sessionValue) {
    return false;
  }

  const cookieStore = await cookies();

  return cookieStore.get(adminCookieName)?.value === sessionValue;
}

import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export const adminCookieName = "ae_admin_session";

const defaultAdminPassword = "ademeren-admin";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? defaultAdminPassword;
}

export function isUsingDefaultAdminPassword() {
  return !process.env.ADMIN_PASSWORD;
}

export function getAdminSessionValue() {
  return createHash("sha256")
    .update(`adem-eren-decoration:${getAdminPassword()}`)
    .digest("hex");
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();

  return cookieStore.get(adminCookieName)?.value === getAdminSessionValue();
}

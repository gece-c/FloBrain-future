import { createLogoIconResponse } from "@/lib/brand/logo-tile.server";

export const dynamic = "force-dynamic";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return createLogoIconResponse(size.width);
}

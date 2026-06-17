import { createLogoIconResponse } from "@/lib/brand/logo-tile.server";

export const dynamic = "force-dynamic";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return createLogoIconResponse(size.width);
}

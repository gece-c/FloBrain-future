import { readFile } from "fs/promises";
import path from "path";

import { ImageResponse } from "next/og";

import { LOGO_OUTLINE_COLOR, LOGO_PUBLIC_PATH } from "@/lib/brand/constants";

const logoFilePath = path.join(process.cwd(), "public", LOGO_PUBLIC_PATH.slice(1));

export async function readLogoBuffer(): Promise<Buffer> {
  return readFile(logoFilePath);
}

export async function createLogoIconResponse(size: number): Promise<ImageResponse> {
  const buffer = await readLogoBuffer();
  const base64 = buffer.toString("base64");
  const markSize = Math.round(size * 0.8);
  const stroke = `drop-shadow(0 0 0.75px ${LOGO_OUTLINE_COLOR}) drop-shadow(0 0 0.75px ${LOGO_OUTLINE_COLOR})`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <img
          src={`data:image/png;base64,${base64}`}
          width={markSize}
          height={markSize}
          alt=""
          style={{ filter: stroke }}
        />
      </div>
    ),
    { width: size, height: size },
  );
}

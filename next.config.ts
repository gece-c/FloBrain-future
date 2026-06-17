import type { NextConfig } from "next";

import { LOGO_ICON_PATH } from "./lib/brand/constants";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: LOGO_ICON_PATH,
      },
    ];
  },
};

export default nextConfig;

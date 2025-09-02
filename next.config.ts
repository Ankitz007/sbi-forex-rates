import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const FOREX_API_HOST = process.env.FOREX_API_HOST;

    return [
      {
        source: "/api/forex/:path*",
        destination: `${FOREX_API_HOST}/:path*`,
      },
    ];
  },
};

export default nextConfig;

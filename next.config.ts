import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/forex/:path*",
        destination: "https://sbi-forex-rates-api.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;

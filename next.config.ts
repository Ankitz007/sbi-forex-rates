import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/forex/:path*",
        destination: "http://0.0.0.0:8000/:path*",
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/forex/:path*",
        destination: "http://0.0.0.0:8080/:path*",
      },
    ];
  },
};

export default nextConfig;

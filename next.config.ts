import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: Menonaktifkan ESLint saat build
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

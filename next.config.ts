import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 Esto desactiva ESLint solo en producción (Vercel)
  },
};

export default nextConfig;

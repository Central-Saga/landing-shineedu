import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ini wajib supaya Next.js membuat folder "out/"
  output: "export",

  // Ini wajib supaya next/image tidak error di static hosting
  images: {
    unoptimized: true,
  },

  // Optional: supaya URL halaman jadi rapi
  trailingSlash: true,
};

export default nextConfig;

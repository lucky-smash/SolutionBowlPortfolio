import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: { formats: ["image/avif", "image/webp"] },
  // Tailwind CSS is small: inline it in <head> so first paint does not wait on a stylesheet request.
  experimental: { inlineCss: true },
};

export default nextConfig;

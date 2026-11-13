import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: { formats: ["image/avif", "image/webp"] },
  // The site is only the portfolio.
  async redirects() {
    return [{ source: '/', destination: '/portfolio', permanent: false }];
  },
};

export default nextConfig;

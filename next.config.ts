import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: { formats: ["image/avif", "image/webp"] },
  // Tailwind CSS is small: inline it in <head> so first paint does not wait on a stylesheet request.
  experimental: { inlineCss: true },
  // The site is only the portfolio.
  async redirects() {
    return [{ source: '/', destination: '/portfolio', permanent: false }];
  },
};

export default nextConfig;

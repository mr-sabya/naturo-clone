import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/category/:slug",
        destination: "/shop?category=:slug",
        permanent: true,
      },
    ];
  },
  images: {
    // Lets local dev proxy images from a local Laravel backend
    // (localhost:8000) through Next's image optimizer — a built-in SSRF
    // guard otherwise refuses any loopback/private-IP host even when it's
    // already allow-listed below. Safe: remotePatterns still pins exactly
    // which hosts are trusted; production images come from a real domain.
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "emgroup.sabyaroy.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

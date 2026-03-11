import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // required for static export
  output: "export",

  images: {
    unoptimized: true,
  },

  // important for GitHub Pages repo
  basePath: "/naturo-clone",
  assetPrefix: "/naturo-clone/",
};

export default nextConfig;
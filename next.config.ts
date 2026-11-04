import type { NextConfig } from "next";
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.sgimobil.md",
        pathname: "/Uploads/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};
export default config;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lsowtuhwxu.ufs.sh",
      },
    ],
  },
};

export default nextConfig;

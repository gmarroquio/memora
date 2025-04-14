import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
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

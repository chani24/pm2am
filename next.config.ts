import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      // {
      //   source: "/:path*",
      //   headers: [
      //     {
      //       key: "Cache-Control",
      //       value: "public, max-age=15552000, immutable",
      //     },
      //   ],
      // },
    ];
  },
};

export default nextConfig;

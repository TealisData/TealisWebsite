import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old training page, removed in favour of /training
      { source: "/learning", destination: "/training", permanent: true },
    ];
  },
};

export default nextConfig;

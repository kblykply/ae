import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/aelogo.png",
        search: "?v=3",
      },
      {
        pathname: "/images/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kermitfloor.com",
        pathname: "/images/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

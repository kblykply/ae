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
      {
        pathname: "/uploads/**",
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
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  transpilePackages: [
    "@react-three/fiber",
    "@react-three/drei",
    "@splinetool/react-spline",
    "@splinetool/runtime",
  ],
};

export default nextConfig;

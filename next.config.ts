import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEST_PUBLIC_BACKEND_URL: "https://nest-js-rouge.vercel.app/"
  },
};

export default nextConfig;

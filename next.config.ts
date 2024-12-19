import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEST_PUBLIC_BACKEND_URL: "http://localhost:5000/",
    
  },
};

export default nextConfig;

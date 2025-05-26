import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "enoch.bytesbear.com"],
  },
  experimental:{
    serverActions:{
      bodySizeLimit:"2mb"
    }
  }
};
  
export default nextConfig;

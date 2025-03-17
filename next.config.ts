import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
        port: ''
      },
    ],
  }
};

export default nextConfig;

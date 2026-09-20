import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: "C:\\Users\\DELL\\Desktop\\do it or die\\izzystore",
  },
  /** @type {import('next').NextConfig} */


 images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "fkkchlcooaczsgpcxpfl.supabase.co",
    },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
  ],
},
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "fkkchlcooaczsgpcxpfl.supabase.co",
  //       pathname: "**",
  //     },
  //   ],
  // },
 };

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "office-backend.amptechnology.in",
        port: "",
        // pathname: "/uploads/**",
      },
      {
        hostname: "localhost",
        protocol: "http",
      },
      {
        hostname: "cdn.amptechnology.in",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;

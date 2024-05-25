/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'i.ibb.co', '127.0.0.1'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;

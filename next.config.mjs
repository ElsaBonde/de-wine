/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ibb.co", "127.0.0.1"],
  },
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;

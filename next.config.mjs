/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'i.ibb.co', '127.0.0.1', 'cdn.pixabay.com', 'pixabay.com', 'freepik.com', 'img.freepik.com', 'static.vecteezy.com'],
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

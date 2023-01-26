/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  images: {
    domains: ['cdn.aaw3k.dev'],
  },
};

module.exports = nextConfig;

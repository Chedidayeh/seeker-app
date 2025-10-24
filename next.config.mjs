/* jshint esversion: 6 */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.allojustice.tn',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '1000MB',
    },
  },
};

export default withNextIntl(nextConfig);

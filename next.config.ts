import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/public/assets/:path*',
        destination: '/assets/:path*',
      },
    ];
  },
};
export default nextConfig;

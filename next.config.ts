import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://openweathermap.org/img/**'), new URL('https://flagcdn.com/**')],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/page-a',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  optimizeFonts: false,
  
  async rewrites() {
    return [
      {
        source: `/api/:path*`,
        destination: 'http://localhost:8080/api/:path*',
      },
      {
        source: `/uploads/:path*`,
        destination: 'http://localhost:8080/uploads/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

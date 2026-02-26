/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    inlineCss: true,
  },
  source: '/api/:path*',
  headers: [
    { key: 'Cache-Control', value: 'no-store, no-cache' },
  ],
}

export default nextConfig

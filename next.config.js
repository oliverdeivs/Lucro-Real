/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/favicon.ico', destination: '/icon-192.svg', permanent: true },
    ]
  },
}
module.exports = nextConfig

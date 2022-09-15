/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['ik.imagekit.io'],
    formats: ['image/avif', 'image/webp'],
  },

  nextConfig: {
    reactStrictMode: true,
    swcMinify: true,
  }
}
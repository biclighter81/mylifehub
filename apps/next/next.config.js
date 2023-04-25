const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['types'],
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
};

module.exports = nextConfig;

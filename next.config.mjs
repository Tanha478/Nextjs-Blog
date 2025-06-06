/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
        ignoreDuringBuilds: true, // Ignore ESLint errors during build
    },
     reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;

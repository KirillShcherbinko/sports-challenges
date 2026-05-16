import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client'],
  reactCompiler: true,
};

export default nextConfig;

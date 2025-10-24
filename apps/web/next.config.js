/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // 모노레포 환경에서 올바른 루트 디렉토리 설정
  outputFileTracingRoot: "/Users/jun/taja-monorepo",
  // Vercel 배포 최적화
  trailingSlash: false,
  generateEtags: false,
};

export default nextConfig;

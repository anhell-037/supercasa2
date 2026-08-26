/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: "/supercasa2",
  assetPrefix: "/supercasa2/",
};

export default nextConfig;

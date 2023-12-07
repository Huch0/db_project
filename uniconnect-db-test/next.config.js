/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = ["pg", ...config.externals];
    }

    return config;
  },
};

module.exports = nextConfig;

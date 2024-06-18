const nextConfig = {
  reactStrictMode: true,
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default nextConfig;

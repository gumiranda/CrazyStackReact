/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const isProd = process.env.NODE_ENV === "production";
const withBundlerAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: { dest: "public", disable: !isProd },
};

module.exports = withBundlerAnalyzer(withPWA(nextConfig));

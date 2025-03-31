/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	// we ignore these since it's checked during CI
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);

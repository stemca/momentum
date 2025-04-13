/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// we ignore these since it's checked during CI
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
	output: "standalone",
};

module.exports = nextConfig;

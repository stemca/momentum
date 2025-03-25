/** @type {import('next').NextConfig} */
const nextConfig = {
	// we ignore these since it's checked during CI
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['xsgames.co'],
	},
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

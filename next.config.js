/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['xsgames.co'],
	},
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ['mysql2'],
	},
	transpilePackages: ['jotai-devtools'],
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

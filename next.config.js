/** @type {import('next').NextConfig} */
const nextConfig = {
	images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

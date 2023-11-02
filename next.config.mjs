import nextBundleAnalyzer from '@next/bundle-analyzer'
import withPlugins from 'next-compose-plugins'
import nextPwa from 'next-pwa'

const withPWA = nextPwa({
	dest: 'public'
})

const withBundleAnalyzer = nextBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = withPlugins([withPWA, withBundleAnalyzer], {
	i18n: {
		locales: ['en-US', 'id-ID'],
		defaultLocale: 'id-ID'
	},
	webpack: config => {
		config.resolve.fallback = { fs: false, path: false }

		return config
	},
	// eslint: {
	// 	ignoreDuringBuilds: true
	// },
	images: {
		domains: ['www.signfix.com.au', 'picsum.photos']
	}
	// experimental: {
	// optimizePackageImports: [
	// 	'@mantine/core',
	// 	'@mantine/hooks',
	// 	'@mantine/notifications'
	// ]
	// }
})

export default nextConfig

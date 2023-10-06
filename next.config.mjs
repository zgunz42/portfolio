import nextPwa from 'next-pwa'

const withPWA = nextPwa({
	dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
	distDir: './dist', // Changes the build output directory to `./dist/`.
	i18n: {
		locales: ['en-US', 'id-ID'],
		defaultLocale: 'id-ID'
	},
	webpack: config => {
		config.resolve.fallback = { fs: false, path: false }

		return config
	}
})

export default nextConfig

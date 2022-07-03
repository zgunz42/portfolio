/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint'
import yaml from '@rollup/plugin-yaml'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
	test: {
		include: ['src/**/__tests__/*'],
		globals: true,
		environment: 'jsdom',
		setupFiles: 'src/setupTests.ts',
		clearMocks: true,
		coverage: {
			enabled: true,
			'70': true,
			reporter: ['text', 'lcov'],
			reportsDirectory: 'coverage/jest'
		}
	},
	plugins: [
		tsconfigPaths(),
		react({
			babel: {
				plugins: [
					[
						'formatjs',
						{
							idInterpolationPattern: '[sha512:contenthash:base64:6]',
							ast: true
						}
					]
				]
			}
		}),
		yaml(),
		...(mode !== 'test'
			? [
					eslintPlugin(),
					VitePWA({
						registerType: 'autoUpdate',
						includeAssets: [
							'favicon.png',
							'robots.txt',
							'apple-touch-icon.png',
							'icons/*.svg',
							'images/*',
							'fonts/*.woff2'
						],
						manifest: {
							theme_color: '#1C7ED6',
							icons: [
								{
									src: '/android-chrome-512x512.png',
									sizes: '512x512',
									type: 'image/png'
								},
								{
									src: '/android-icon-36x36.png',
									sizes: '36x36',
									type: 'image/png',
									density: '0.75'
								},
								{
									src: '/android-icon-48x48.png',
									sizes: '48x48',
									type: 'image/png',
									density: '1.0'
								},
								{
									src: '/android-icon-72x72.png',
									sizes: '72x72',
									type: 'image/png',
									density: '1.5'
								},
								{
									src: '/android-icon-96x96.png',
									sizes: '96x96',
									type: 'image/png',
									density: '2.0'
								},
								{
									src: '/android-icon-144x144.png',
									sizes: '144x144',
									type: 'image/png',
									density: '3.0'
								},
								{
									src: '/android-icon-192x192.png',
									sizes: '192x192',
									type: 'image/png',
									purpose: 'any maskable',
									density: '4.0'
								}
							]
						}
					})
			  ]
			: [])
	]
}))

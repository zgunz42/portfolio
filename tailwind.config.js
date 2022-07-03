const defaultConfig = require('tailwindcss/defaultConfig')

module.exports = {
	content: ['index.html', 'src/**/*.tsx'],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultConfig.theme.fontFamily.sans]
		},
		extend: {
			colors: {
				facebook: '#3b5998',
				twitter: '#00aced',
				whatsapp: '#25d366',
				instagram: '#e1306c',
				linkedin: '#0077b5'
			}
		}
	},
	corePlugins: {
		preflight: false
	},
	experimental: { optimizeUniversalDefaults: true },
	plugins: [require('@tailwindcss/line-clamp')]
}

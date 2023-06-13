/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			'mobile': '560px',
			'iPad': '715px',
			'tablet': '815px',
			'laptop': '1180px',
			'desktop': '1280px',
		},
		extend: {},
		colors: {
			'body': '#333',
			'lightgrey': '#eee',
			'offwhite': '#ddd',
			'light': '#fff',
			'green': '#01bf5d',
			'error': '#ff0000',
			'dark': '#000',
			'lightdark': '#666',
			'primary': '#0984e3',
			'secondary': '#e20512',
			'darktranparent': 'rgb(39 25 25 / 50%)',
		},
	},
	plugins: [
		plugin(function ({ addComponents }) {
			addComponents({
				'.primaryBtn': {
					background: '#0984e3',
					fontSize: '14px',
					color: '#fff',
					padding: '4px 15px',
					borderRadius: '4px',
					cursor: 'pointer',
					border: '0',
					outline: 'none',
					lineHeight: '22px',
				},
			})
		})
	],
}
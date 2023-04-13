/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: { primary: ['var(--font-primary)'] },
			colors: { primary: '#ff385c' },
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.scrollbar-hidden': {
					/* Hide scrollbar for Chrome, Safari and Opera */
					'&::-webkit-scrollbar': {
						display: 'none',
					},
					/* Hide scrollbar for IE, Edge and Firefox */
					'&': {
						'-ms-overflow-style': 'none' /* IE and Edge */,
						'scrollbar-width': 'none' /* Firefox */,
					},
				},
			});
		}),
	],
};

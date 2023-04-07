/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: { primary: ['var(--font-primary)'] },
			colors: { primary: '#ff385c' },
		},
	},
	plugins: [],
};

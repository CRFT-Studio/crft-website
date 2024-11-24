/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	    fontFamily: {
			'serif': ["Playfair Display"],
		},
		
		extend: {},
	},
	plugins: [
	   require('@tailwindcss/typography'),
	],
}

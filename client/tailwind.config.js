/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			"sm": "320px",
			"md": "768px",
			"lg": "1366px",
			"xl": "1536px",
			"2xl": "1920px",
		},
		// Custom breakpoints, taken directly from design.
		container: {
			center: true,
			// Without this option set to true, our container will be not centered.
			padding: {
				"sm": "1.5rem",
				"md": "4.5rem",
				"lg": "9.8rem",
				"xl": "12rem",
				"2xl": "14rem",
			},
		},
		// Custom padding for container, values taken directly from design.
		extend: {
			colors: {
				"blue-zodiac": "#122947",
				"gainsboro": "#DBDCE0",
			},
		},
	},
	plugins: [],
};

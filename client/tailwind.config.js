/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: "320px",
			md: "768px",
			lg: "1366px",
		},
		// Custom breakpoints, taken directly from design.
		container: {
			center: true,
			// Without this option set to true, our container will be not centered.
			padding: {
				sm: "1.5rem",
				md: "4.5rem",
				lg: "9.8rem",
			},
		},
		// Custom padding for container, values taken directly from design.
		extend: {},
	},
	plugins: [],
};

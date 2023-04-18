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
		container: {
			center: true,
			padding: {
				"sm": "1.5rem",
				"md": "4.5rem",
				"lg": "9.8rem",
				"xl": "12rem",
				"2xl": "14rem",
			},
		},
		fontSize: {
			"lg-16px": [
				"1.6rem",
				{
					lineHeight: "2.4rem",
				},
			],
			"sm-28px": [
				"2.8rem",
				{
					lineHeight: "3.6rem",
				},
			],
			"md-32px": [
				"3.2rem",
				{
					lineHeight: "4rem",
				},
			],
		},
		fontWeight: {
			thin: "100",
			extralight: "200",
			light: "300",
			normal: "400",
			medium: "500",
			semibold: "600",
			bold: "700",
			extrabold: "800",
			black: "900",
		},
		fontFamily: {
			mPlus: ["MPLUS1p"],
			raleway: ["Raleway"],
		},
		extend: {
			colors: {
				"blue-zodiac": "#122947",
				"gainsboro": "#DBDCE0",
				"desert-storm": "#F8F8F6",
			},
			boxShadow: {
				burgerMenu: "0px 4px 30px rgba(214, 214, 214, 0.19)",
			},
		},
	},
	plugins: [],
};

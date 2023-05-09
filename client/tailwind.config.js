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
			"sm-12px": [
				"1.2rem",
				{
					lineHeight: "1.8rem",
				},
			],
			"sm-12px-lh-17px": [
				"1.2rem",
				{
					lineHeight: "1.7rem",
				},
			],
			"sm-13px": [
				"1.3rem",
				{
					lineHeight: "1.9rem",
				},
			],
			"sm-14px": [
				"1.4rem",
				{
					lineHeight: "2.1rem",
				},
			],
			"sm-14px-lh-20px": [
				"1.4rem",
				{
					lineHeight: "2rem",
				},
			],
			"sm-16px": [
				"1.6rem",
				{
					lineHeight: "2.2rem",
				},
			],
			"sm-16px-lh-23px": [
				"1.6rem",
				{
					lineHeight: "2.3rem",
				},
			],
			"sm-28px": [
				"2.8rem",
				{
					lineHeight: "3.6rem",
				},
			],
			"sm-28px-lh-35px": [
				"2.8rem",
				{
					lineHeight: "3.5rem",
				},
			],
			"sm-42px": [
				"4.2rem",
				{
					lineHeight: "4.9rem",
				},
			],
			"md-16px": [
				"1.6rem",
				{
					lineHeight: "2.4rem",
				},
			],
			"md-16px-lh-22px": [
				"1.6rem",
				{
					lineHeight: "2.2rem",
				},
			],
			"md-18px": [
				"1.8rem",
				{
					lineHeight: "2.6rem",
				},
			],
			"md-32px": [
				"3.2rem",
				{
					lineHeight: "4rem",
				},
			],
			"md-32px-lh-42px": [
				"3.2rem",
				{
					lineHeight: "4.2rem",
				},
			],
			"md-54px": [
				"5.4rem",
				{
					lineHeight: "6.3rem",
				},
			],
			"lg-16px": [
				"1.6rem",
				{
					lineHeight: "2.4rem",
				},
			],
			"lg-58px": [
				"5.8rem",
				{
					lineHeight: "6.8rem",
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
				"blue-zodiac": {
					50: "#f2f7fd",
					100: "#e4edfa",
					200: "#c3dbf4",
					300: "#8dbdec",
					400: "#519bdf",
					500: "#2a7fcd",
					600: "#1b64ae",
					700: "#174f8d",
					800: "#174475",
					900: "#193b61",
					950: "#122947",
				},
				"iron": {
					50: "#f6f7f8",
					100: "#ebebee",
					200: "#dbdce0",
					300: "#c4c6cc",
					400: "#a7a9b3",
					500: "#9193a0",
					600: "#808190",
					700: "#737382",
					800: "#61616c",
					900: "#505058",
					950: "#333338",
				},
				"desert-storm": {
					50: "#f8f8f6",
					100: "#f2f2ee",
					200: "#e8e8e0",
					300: "#d7d7ca",
					400: "#bebeab",
					500: "#a6a68d",
					600: "#8e8e74",
					700: "#76765f",
					800: "#636351",
					900: "#555547",
					950: "#2c2c23",
				},
				"pampas": {
					50: "#f4f1ed",
					100: "#efebe5",
					200: "#ded5ca",
					300: "#c9baa8",
					400: "#b39a84",
					500: "#a3846c",
					600: "#967460",
					700: "#7d5f51",
					800: "#664f46",
					900: "#54413a",
					950: "#2c211e",
				},
				"alto": {
					50: "#f8f8f8",
					100: "#f0f0f0",
					200: "#e4e4e4",
					300: "#d1d1d1",
					400: "#b4b4b4",
					500: "#9a9a9a",
					600: "#818181",
					700: "#6a6a6a",
					800: "#5a5a5a",
					900: "#4e4e4e",
					950: "#282828",
				},
				"dusty-gray": {
					50: "#f8f8f8",
					100: "#f0f0f0",
					200: "#e4e4e4",
					300: "#d1d1d1",
					400: "#b4b4b4",
					500: "#959595",
					600: "#818181",
					700: "#6a6a6a",
					800: "#5a5a5a",
					900: "#4e4e4e",
					950: "#282828",
				},
				"silver": {
					50: "#f8f8f8",
					100: "#f0f0f0",
					200: "#e4e4e4",
					300: "#cdcdcd",
					400: "#b4b4b4",
					500: "#9a9a9a",
					600: "#818181",
					700: "#6a6a6a",
					800: "#5a5a5a",
					900: "#4e4e4e",
					950: "#282828",
				},
				"bombay": {
					50: "#f6f7f8",
					100: "#ebecee",
					200: "#dbdee2",
					300: "#c2c9ce",
					400: "#b3bac1",
					500: "#8e97a3",
					600: "#7d8593",
					700: "#707785",
					800: "#5f636e",
					900: "#4e525a",
					950: "#323439",
				},
				"manatee": {
					50: "#f7f7f7",
					100: "#ececed",
					200: "#dddee0",
					300: "#c6c8ca",
					400: "#aaaeb0",
					500: "#9a9da0",
					600: "#85888b",
					700: "#777a7e",
					800: "#646669",
					900: "#525356",
					950: "#343537",
				},
			},
			gridTemplateColumns: {
				"2": "repeat(2, 7rem)",
				"hero-two": "repeat(2, minmax(0, 1fr))",
				"hero-three": "33rem, 27.4rem, 33rem",
				"hero-five": "20.1rem, 4.4rem, 18.7rem, 4.4rem, 20.1rem",
				"bestsellers-two": "21.4rem auto",
				"new-collection-three-sm": "1fr 25.3rem 1fr",
				"new-collection-three-md": "1fr 28.4rem 2rem",
				"new-collection-three-lg": "1fr 28.4rem 16rem",
			},
			gridTemplateRows: {
				"2-auto": "repeat(2, auto)",
				"3-auto": "repeat(3, auto)",
				"5-auto": "repeat(5, auto)",
			},
			boxShadow: {
				burgerMenu: "0px 4px 30px rgba(214, 214, 214, 0.19)",
			},
		},
	},
	plugins: [],
};

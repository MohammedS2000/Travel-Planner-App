/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components//**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: {
					0: "#d7f7f0",
					100: "#4FFFD6",
					200: "#4FB3A9",
					300: "#3D8A7D",
					400: "#546E6A",
					500: "#4D6963",
				},
			},
		},
	},
	plugins: [],
};
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			// Set font family
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
			},
			// Set theme colors (Required config!)
			colors: {
				primary: colors.blue,
				secondary: colors.slate,
			},
		},
	},
	// Add plugins
	plugins: [],
};

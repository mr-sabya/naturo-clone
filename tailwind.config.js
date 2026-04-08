/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                naturoGreen: "#00AA4E",      // Main Green
                naturoLight: "#F3FBF6",      // Light background
                naturoOrange: "#FF9900",     // Discount badges
                naturoGray: "#777777",       // Text color
            },
            container: {
                center: true,
                padding: "1rem",
            },
            animation: {
                'bounce-slow': 'bounce-slow 3s infinite',
            },
            keyframes: {
                'bounce-slow': {
                    '0%, 100%': {
                        transform: 'translateY(-5%)',
                        animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
                    },
                    '50%': {
                        transform: 'translateY(0)',
                        animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
                    },
                },
            },

        },
    },
    plugins: [],
}
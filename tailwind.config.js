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
                naturoOrange: "#EE7123",     // Discount badges
                naturoGray: "#777777",       // Text color
            },
            container: {
                center: true,
                padding: "1rem",
            },
            animation: {
                'morph': 'morph 8s ease-in-out infinite',
                'bounce-slow': 'bounce 5s ease-in-out infinite',
                'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
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
                'fadeInUp': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },

                'morph': {
                    '0%, 100%': { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
                    '50%': { borderRadius: '70% 30% 40% 60% / 50% 60% 40% 50%' },
                }
            },

        },
    },
    plugins: [],
}
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
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */

module.exports = {
  important: true,
  content: [
    "./client/routes/**/*.tsx",
    "./client/components/**/*.tsx",
    "./client/*.{tsx,html}",
    "./client/providers/*.tsx",
  ],
  theme: {
    screens: {
      sm: { max: "640px" },
      md: { max: "768px" },
      lg: { max: "1024px" },
      xl: { max: "1280px" },
      "2xl": { max: "1536px" },
      "3xl": "1920px",
    },
    extend: {
      colors: {
        primary: {
          50: "#FEF5F3",
          100: "#FDE7E3",
          200: "#fcd4cc",
          300: "#f8b6a9",
          400: "#f17f69",
          500: "#e8644b",
          600: "#d4492e",
          700: "#b23a23",
          800: "#943320",
          900: "#7b3021",
          950: "#43150c",
        },
        secondary: {
          50: "#F2F9F9",
          100: "#DDEDF0",
          200: "#BFDCE2",
          300: "#93C2CD",
          400: "#73ACBA",
          500: "#448596",
          600: "#3B6E7F",
          700: "#355B69",
          800: "#324D58",
          900: "#2d414c",
          950: "#1a2932",
        },
      },
      fontFamily: {
        default: ["Segoe UI Historic", "sans-serif", "system-ui"],
        header: ["Inter", "sans-serif", "system-ui"],
        body: ["Segoe UI Historic", "sans-serif", "system-ui"],
        body2: ["Roboto", "sans-serif", "system-ui"],
        sans: [
          "Segoe UI Historic",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: {
        900: "#000000",
        800: "#212325",
        700: "#91919f",
      },
      dev: "#b9e28c",
      green: "#4ecb71",
      "off-white": {
        800: "#9fa5c0",
        300: "#d0dbea",
        200: "#f1f1fa",
        100: "#fcfcfc",
      },
      purple: {
        600: "#3306c3",
        500: "#5b31e0",
        400: "#6536f9",
        300: "#8b68fa",
      },
      red: {
        500: "#e73f3f",
        400: "#eb5c5c",
        300: "#f18989",
      },
      white: "#ffffff",
    },
    extend: {
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        body: "60rem",
      },
    },
  },
  plugins: [],
};
export default config;

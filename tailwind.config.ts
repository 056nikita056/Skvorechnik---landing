import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          950: "#0d0705",
          900: "#1a0a04",
          800: "#3b1f0e",
          700: "#6b3a1f",
        },
        caramel: {
          DEFAULT: "#c8894d",
          light: "#e8b86d",
        },
        cream: {
          DEFAULT: "#fdf8f3",
          dark: "#f5e9d5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(200, 137, 77, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#000000", soft: "#0c0b09" },
        gold: { DEFAULT: "#C9A24B", light: "#EBCB82", deep: "#8F6F2E" },
        ivory: { DEFAULT: "#F3EBDD", dim: "#B9B0A0" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

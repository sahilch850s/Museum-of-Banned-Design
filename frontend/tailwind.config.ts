import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        museum: {
          black: "#0A0A0B",
          dark: "#121215",
          card: "#1A1A1E",
          border: "#2A2A30",
          red: "#FF3333", // Censorship accent color
          gold: "#D4AF37",
          muted: "#8E8E93",
        },
      },
    },
  },
  plugins: [],
};
export default config;
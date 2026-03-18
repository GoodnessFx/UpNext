/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080F",
        surface: "#0F0F1A",
        "surface-raised": "#141422",
        border: "#1C1C2E",
        "border-active": "#2E2E4A",
        accent: "#6C47FF",
        "accent-alt": "#FF6B35",
        gold: "#FFD700",
        green: "#00D68F",
        red: "#FF3366",
        blue: "#0EA5E9",
        "text-primary": "#F2F2FF",
        "text-secondary": "#8888AA",
        "text-muted": "#55556A",
      },
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        heading: ["Syne", "sans-serif"],
        numbers: ["Syne", "sans-serif"],
        body: ["Inter", "sans-serif"],
        ui: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "16px",
        pill: "9999px",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};

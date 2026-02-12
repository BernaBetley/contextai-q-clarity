import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        brand: {
          50: "#f0f4ff",
          100: "#dbe4ff",
          500: "#4263eb",
          600: "#3b5bdb",
          700: "#364fc7",
          900: "#1b2559",
        },
        surface: {
          0: "#ffffff",
          50: "#f8f9fa",
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#868e96",
          700: "#495057",
          800: "#343a40",
          900: "#212529",
        },
        status: {
          pending: "#fab005",
          running: "#4263eb",
          success: "#2f9e44",
          error: "#e03131",
        },
      },
    },
  },
  plugins: [],
};

export default config;

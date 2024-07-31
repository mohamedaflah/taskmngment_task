import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        borderImage: "linear-gradient(360deg, #4B36CC 0%, #9C93D4 107.69%)",

        alerts: {
          urgent: "#FF6B6B",
          medium: "#FFA235",
          low: "#0ECC5A",
        },
        forgroundColor: {
          voilet: "#4534AC",
          black: "#080808",
          kanbanbox: "#F9F9F9",
          "side-button": "#F4F4F4",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      backgroundImage: {
        create: "linear-gradient(180deg, #4C38C2 0%, #2F2188 100%)",
        add: "linear-gradient(180deg, #3A3A3A 0%, #202020 100%)",
        link: "#0054A1",
        "custom-gradient": "linear-gradient(180deg, #FFFFFF 0%, #AFA3FF 100%)",
        "foreground-image":
          "linear-gradient(180deg, #4C38C2 0%, #2F2188 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))",
        "secondary-gradient":
          "linear-gradient(180deg, #FFFFFF 0%, #AFA3FF 100%)",
        "auth-sections": "linear-gradient(180deg, #F7F7F7 0%, #F0F0F0 100%)",
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("daisyui"),
    require("tailwind-scrollbar"),
  ],
} satisfies Config;

export default config;

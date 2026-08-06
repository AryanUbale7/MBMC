import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          primary: "#123B7A",
          secondary: "#1D4F9A",
          navbar: "#4147D5",
          bg: "#F5F7FB",
          card: "#FFFFFF",
          border: "#DCE6F7",
          accent: "#F4B400",
          text: "#1A2B4C",
          muted: "#6B7280",
          footer: "#102F61",
          surface: "#EFF4FC",
          badgeBg: "#EBF2FD",
          badgeBorder: "#C0D4F7",
          badgeText: "#123B7A"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "var(--font-noto-sans)", "Noto Sans", "sans-serif"],
        devanagari: ["var(--font-noto-sans)", "Noto Sans", "sans-serif"]
      },
      borderRadius: {
        'gov-card': '14px',
        'gov-sm': '12px',
        'gov-lg': '16px',
      },
      boxShadow: {
        'gov-sm': '0 2px 6px rgba(18, 59, 122, 0.05)',
        'gov-md': '0 4px 14px rgba(18, 59, 122, 0.08)',
        'gov-lg': '0 8px 24px rgba(18, 59, 122, 0.12)',
      }
    },
  },
  plugins: [],
};
export default config;

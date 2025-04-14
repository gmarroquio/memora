import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--color-blue-800)",
            "--tw-prose-headings": "var(--color-blue-900)",
            "--tw-prose-lead": "var(--color-blue-700)",
            "--tw-prose-links": "var(--color-blue-900)",
            "--tw-prose-bold": "var(--color-blue-900)",
            "--tw-prose-counters": "var(--color-blue-600)",
            "--tw-prose-bullets": "var(--color-blue-400)",
            "--tw-prose-hr": "var(--color-blue-300)",
            "--tw-prose-quotes": "var(--color-blue-900)",
            "--tw-prose-quote-borders": "var(--color-blue-300)",
            "--tw-prose-captions": "var(--color-blue-700)",
            "--tw-prose-code": "var(--color-blue-900)",
            "--tw-prose-pre-code": "var(--color-blue-100)",
            "--tw-prose-pre-bg": "var(--color-blue-900)",
            "--tw-prose-th-borders": "var(--color-blue-300)",
            "--tw-prose-td-borders": "var(--color-blue-200)",
            "--tw-prose-invert-body": "var(--color-blue-200)",
            "--tw-prose-invert-headings": "var(--color-white)",
            "--tw-prose-invert-lead": "var(--color-blue-300)",
            "--tw-prose-invert-links": "var(--color-white)",
            "--tw-prose-invert-bold": "var(--color-white)",
            "--tw-prose-invert-counters": "var(--color-blue-400)",
            "--tw-prose-invert-bullets": "var(--color-blue-600)",
            "--tw-prose-invert-hr": "var(--color-blue-700)",
            "--tw-prose-invert-quotes": "var(--color-blue-100)",
            "--tw-prose-invert-quote-borders": "var(--color-blue-700)",
            "--tw-prose-invert-captions": "var(--color-blue-400)",
            "--tw-prose-invert-code": "var(--color-white)",
            "--tw-prose-invert-pre-code": "var(--color-blue-300)",
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": "var(--color-blue-600)",
            "--tw-prose-invert-td-borders": "var(--color-blue-700)",
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

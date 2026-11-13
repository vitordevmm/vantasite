import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vanta: {
          DEFAULT: '#0a0a0c',
          dark: '#121217',
          light: '#1c1c24',
          card: '#121218',
          surface: '#181822',
          accent: '#7c3aed',
          cyan: '#06b6d4',
          border: 'rgba(255, 255, 255, 0.08)',
          hairline: 'rgba(255, 255, 255, 0.05)',
        },
        gold: {
          DEFAULT: '#E5A93C',
          light: '#F5BE58',
          hover: '#D49629',
          dark: '#9A6B1A',
          muted: 'rgba(229, 169, 60, 0.12)',
          border: 'rgba(229, 169, 60, 0.22)',
          glow: 'rgba(229, 169, 60, 0.35)',
        },
        discord: {
          DEFAULT: '#5865F2',
          hover: '#4752c4',
          dark: '#2b2d31',
        },
        success: {
          DEFAULT: '#22c55e',
          glow: 'rgba(34, 197, 94, 0.4)',
        },
        danger: '#ED4245',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        spinNeon: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-neon': 'spinNeon 2.6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;

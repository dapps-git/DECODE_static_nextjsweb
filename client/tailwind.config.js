/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0A0A0A',
          charcoal: '#121212',
          surface: '#1A1A1A',
          border: '#27272A',
          red: '#E50914',
          'red-hover': '#C80813',
          'red-subtle': '#FEF2F2',
          'red-border': '#FCA5A5',
        },
        primary: {
          DEFAULT: '#E50914', // DECODE Red
          hover: '#C80813',
          light: '#FEF2F2',
          dark: '#991B1B',
        },
        ink: {
          main: '#0F172A',
          muted: '#64748B',
        },
        status: {
          success: '#16A34A',
          warning: '#EA580C',
          error: '#DC2626',
        },
        canvas: '#F8FAFC',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: [
          'Montserrat',
          'Manrope',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card-hover': '0 4px 14px 0 rgba(0, 0, 0, 0.08)',
        'glow-red': '0 2px 10px 0 rgba(229, 9, 20, 0.25)',
      },
    },
  },
  plugins: [],
};

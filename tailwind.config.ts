import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A0E1A',
        teal: {
          DEFAULT: '#00D4FF',
          dark: '#0099BB',
          glow: '#00D4FF26',
        },
        coral: {
          DEFAULT: '#FF6B35',
          dark: '#CC4F1F',
          glow: '#FF6B3526',
        },
        'soft-white': '#F0F4FF',
        slate: {
          DEFAULT: '#1E2A3A',
          light: '#2A3A50',
          border: '#2A3A5066',
        },
      },
      fontFamily: {
        heading: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '0.95' }],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px #00D4FF40' },
          to: { boxShadow: '0 0 60px #00D4FF80, 0 0 120px #00D4FF30' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh':
          'radial-gradient(at 40% 20%, #00D4FF15 0px, transparent 50%), radial-gradient(at 80% 0%, #FF6B3510 0px, transparent 50%), radial-gradient(at 0% 50%, #00D4FF08 0px, transparent 50%)',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}
export default config

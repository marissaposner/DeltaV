import type { Config } from 'tailwindcss'

export default {
  // content: [],
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'martel': ['Martel', 'serif'],
      },
      boxShadow: {
        'standard' : '0px 1.9508970975875854px 9.754485130310059px 0px rgba(124, 141, 181, 0.12)',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/forms'),
  ],
} satisfies Config


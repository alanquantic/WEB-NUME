import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
        muted: 'hsl(var(--muted))',
        primary: 'hsl(var(--primary))',
        'primary-soft': 'hsl(var(--primary-soft))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        fuchsia: 'hsl(var(--fuchsia))',
        danger: 'hsl(var(--danger))',
        'area-trabajo': 'hsl(var(--area-trabajo))',
        'area-amor': 'hsl(var(--area-amor))',
        'area-bienestar': 'hsl(var(--area-bienestar))',
        'area-espiritual': 'hsl(var(--area-espiritual))'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        panel: '0 18px 60px hsl(263 67% 35% / 0.12)',
        glow: '0 24px 70px hsl(295 78% 40% / 0.18)'
      }
    }
  },
  plugins: []
}

export default config


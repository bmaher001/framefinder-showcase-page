import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./demo/index.html', './demo/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        window: 'rgb(var(--ff-bg) / <alpha-value>)',
        surface: 'rgb(var(--ff-surface) / <alpha-value>)',
        elevated: 'rgb(var(--ff-surface-alt) / <alpha-value>)',
        panel: 'rgb(var(--ff-surface-hover) / <alpha-value>)',
        line: 'rgb(var(--ff-border) / <alpha-value>)',
        'line-strong': 'rgb(var(--ff-border-strong) / <alpha-value>)',
        primary: 'rgb(var(--ff-text-primary) / <alpha-value>)',
        secondary: 'rgb(var(--ff-text-secondary) / <alpha-value>)',
        muted: 'rgb(var(--ff-text-tertiary) / <alpha-value>)',
        accent: 'rgb(var(--ff-accent) / <alpha-value>)',
        'accent-hover': 'rgb(var(--ff-accent-hover) / <alpha-value>)',
        'accent-press': 'rgb(var(--ff-accent-press) / <alpha-value>)',
        'on-accent': 'rgb(var(--ff-on-accent) / <alpha-value>)',
        info: 'rgb(var(--ff-info) / <alpha-value>)',
        error: 'rgb(var(--ff-error) / <alpha-value>)',
        signal: {
          100: 'rgb(var(--signal-100) / <alpha-value>)',
          300: 'rgb(var(--signal-300) / <alpha-value>)',
          400: 'rgb(var(--signal-400) / <alpha-value>)',
          450: 'rgb(var(--signal-450) / <alpha-value>)',
          500: 'rgb(var(--signal-500) / <alpha-value>)',
          600: 'rgb(var(--signal-600) / <alpha-value>)',
          700: 'rgb(var(--signal-700) / <alpha-value>)',
        },
        daylight: 'rgb(var(--daylight-500) / <alpha-value>)',
        confirmed: 'rgb(var(--confirmed) / <alpha-value>)',
        rejected: 'rgb(var(--rejected) / <alpha-value>)',
      },
      borderRadius: { 'ff-xs': '5px', 'ff-sm': 'var(--ff-radius-sm)', ff: 'var(--ff-radius)', 'ff-lg': 'var(--ff-radius-lg)' },
      spacing: {
        'ff-2': 'var(--ff-space-2)', 'ff-4': 'var(--ff-space-4)', 'ff-8': 'var(--ff-space-8)',
        'ff-12': 'var(--ff-space-12)', 'ff-16': 'var(--ff-space-16)', 'ff-24': 'var(--ff-space-24)',
        'ff-32': 'var(--ff-space-32)', 'ff-48': 'var(--ff-space-48)', 'ff-64': 'var(--ff-space-64)',
      },
      fontFamily: {
        sans: ['Inter', 'IBM Plex Sans Arabic', 'ui-sans-serif', 'system-ui'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: { card: 'var(--ff-shadow-card)', panel: 'var(--ff-shadow-panel)' },
    },
  },
  plugins: [],
} satisfies Config

import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

type AccType = Record<string, string>

const range = (start: number, end: number): number[] => {
  const array: number[] = []
  for (let i = start; i <= end; i += 1) {
    array.push(i)
  }
  return array
}

const pxToRem = (px: number, base = 16) => `${px / base}rem`

const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    spacing: {
      ...range(0, 1600).reduce((acc: AccType, px: number) => {
        acc[`${px}pxr`] = pxToRem(px)
        return acc
      }, {}),
    },
    fontSize: {
      ...range(0, 200).reduce((acc: AccType, px: number) => {
        acc[`${px}pxr`] = pxToRem(px)
        return acc
      }, {}),
    },
    extend: {
      colors: {
        'background-main': '#2E2F38',
        'button-main': '#81818D',
        'button-main-hover': '#9E9EAC',
        'background-sidebar': '#25262D',
        'button-sidebar': '#3A3A41',
        'button-sidebar-hover': '#6C6C73',
        'text-box-text': '#C7C8D1',
        'alert-red': '#F23F42',
        'chat-box': '#595C6C',
        'chat-box-me': '#575B78',
        'button-green': '#2CDB75',
        'button-blue': '#5865F2',
        'button-gray': '#909090',
        'background-sidebar-bottom': '#1B1C21',
      },
      keyframes: {},
      animation: {},
      screens: {},
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {}

      addUtilities(newUtilities)
    }),
  ],
} satisfies Config

export default config

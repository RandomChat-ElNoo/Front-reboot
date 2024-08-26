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
      colors: {},
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

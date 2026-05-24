import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        profit: '#00A050',
        loss: '#EF4444',
        warning: '#F59E0B',
        brand: {
          50: '#E6F7F0',
          100: '#C2EDD9',
          200: '#99DBB8',
          300: '#66C493',
          400: '#33AD6E',
          500: '#009654',
          600: '#007A44',
          700: '#005E34',
          800: '#004224',
          900: '#002814',
          950: '#001414',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

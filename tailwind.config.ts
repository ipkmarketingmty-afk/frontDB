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
        'vault-black': '#000000',
        'vault-card': '#0A0A0A',
        'vault-border': '#262626',
        'vault-text': '#EDEDED',
        'vault-gray': '#404040',
      },
    },
  },
  plugins: [],
}
export default config

import type { Config } from 'tailwindcss'

export default {
   content: [  "./app/**/*.{js,ts,jsx,tsx}",
   "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config


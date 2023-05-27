import type { Config } from 'tailwindcss'

export default {
   content: [  "./app/**/*.{js,ts,jsx,tsx}",
   "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    fontFamily: {
      "caslon": ["caslon", "sans-serif"],
      "minion":["minion","serif"]
    }
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config


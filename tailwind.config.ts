import type { Config } from 'tailwindcss'

export default {
   content: [  "./app/**/*.{js,ts,jsx,tsx}",
   "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    fontFamily: {
      "caslon": ["caslon", "sans-serif"],
      "minion":["minion","serif"]
    },
    colors: {
      "primary":"blue"
    }
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config


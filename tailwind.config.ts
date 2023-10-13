import type { Config } from "tailwindcss"
import radixThemePlugin from "radix-ui-themes-with-tailwind"

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [
    radixThemePlugin({
      useTailwindRadiusNames: true,
    }),
  ],
}
export default config

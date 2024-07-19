import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/theme";
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1.6rem'
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      aspectRatio: {
        '3/2': '3/2'
      },
      colors: {
        primary: "#2DADA1",
        "primary-01": "#30CFC1",

        black: "#1D1D1D",
        "black-01": "#161616",

        "bg-01": "#EEEEEE",
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    flowbite.plugin(),
  ],
} satisfies Config;

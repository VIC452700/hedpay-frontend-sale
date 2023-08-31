/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: [
    "./public/**/*.html",
    "./src/modules/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/pages/**/*.tsx"
  ],
  theme: {
    colors: {
      white: "#FFF",

      black: "#000",

      grey: "#DFDFDF",

      primary: "#02FEFE",
      "primary-dark": "#494DD4",

      background: "#002554",
      "background-light": "#142850",

      default: "#142850",

      negative: "#FF0100",

      positive: "#2FEE10",

      transparent: "transparent"
    },
    fontSize: {
      xxs: "0.65rem",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "1.875rem",
      "3xl": "2.25rem",
      "4xl": "3rem",
      "5xl": "4rem",
      "6xl": "6rem"
    },
    fontFamily: {
      sans: ['"Raleway"', "sans-serif"],
      gilroy: ['"Gilroy"', "monospace"],
      spaceMono: ['"SpaceMono"', "monospace"]
    },
    fontWeight: {
      thin: "300",
      regular: "400",
      "semi-bold": "600",
      bold: "700",
      "extra-bold": "900"
    },
    screens: {
      "3xs": { min: "400.98px" },
      "2xs": { min: "540.98px" },
      xs: { min: "740.98px" },
      sm: { min: "780.98px" },
      md: { min: "1024.98px" },
      mdH: { raw: "(max-height: 750.98px)" },
      lg: { min: "1280.98px" },
      xl: { min: "1920.98px" },
      "2xl": { min: "2560px" }
    },
    extend: {
      backgroundImage: {
        "bg-gradient": "linear-gradient(109.63deg, #42A7C1 4.61%, #F4F4F4 96.52%)",
        "teal-gradient": "linear-gradient(93.38deg, #67D8ED 0.73%, #FFFFFF 100%)"
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        },
        slideInFromLeft: {
          from: {
            opacity: 0,
            translate: "-100% 0"
          },
          to: {
            opacity: 1
          }
        },
        slideInFromRight: {
          from: {
            opacity: 0,
            translate: "100% 0"
          },
          to: {
            opacity: 1
          }
        },
        slideInFromTop: {
          from: {
            opacity: 0,
            translate: "0 -100%"
          },
          to: {
            opacity: 1
          }
        }
      },
      animation: {
        fadeIn: "fadeIn 0.5s linear forwards",
        slideInFromLeft: "slideInFromLeft 0.75s ease-out",
        slideInFromRight: "slideInFromRight 0.75s ease-out",
        slideInFromTop: "slideInFromTop 0.75s ease-out"
      }
    }
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  plugins: []
};

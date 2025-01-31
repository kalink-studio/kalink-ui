import { createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    light: null,
    dark: null,

    outline: null,
  },

  state: {
    hovered: {
      opacity: null,
    },
    focused: {
      opacity: null,
    },
    pressed: {
      opacity: null,
    },
  },

  measure: null,

  typeface: {
    brand: null,
    plain: null,
  },

  fontSize: {
    "2xs": null,
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    "2xl": null,
    "3xl": null,
    "4xl": null,
    "5xl": null,
    "6xl": null,
    "7xl": null,
    "8xl": null,
    "9xl": null,
  },

  spacing: {
    none: null,
    "2xs": null,
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    "2xl": null,
    "3xl": null,
    "4xl": null,
    "5xl": null,
    "6xl": null,
    "7xl": null,
    "8xl": null,
    "9xl": null,
  },

  screen: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    "2xl": null,
    "3xl": null,
  },

  radius: {
    none: null,
    sharp: null,
    small: null,
    default: null,
    rounded: null,
    circle: null,
  },

  elevation: {
    none: null,
    minimal: null,
    low: null,
    moderate: null,
    high: null,
    peak: null,
  },

  duration: {
    swift: null,
    short: null,
    standard: null,
    long: null,
    extended: null,
  },

  easing: {
    inOut: null,
    linear: null,
  },
});

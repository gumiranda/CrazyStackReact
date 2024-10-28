import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";

export const colors = {
  primary: {
    500: { value: "#9f7aea" },
    600: { value: "#6936d1" },
    700: { value: "#5932b7" },
  },
  secondary: {
    400: { value: "#3f3f3f" },
    500: { value: "#2e2e2e" },
    600: { value: "#212121" },
    900: { value: "#212121" },
  },
  gray: {
    400: { value: "#3f3f3f" },
    500: { value: "#2e2e2e" },
    600: { value: "#212121" },
    900: { value: "#212121" },
  },
  tertiary: {
    300: { value: "#3ee360" },
    500: { value: "#04D361" },
  },
  grayscale: {
    500: { value: "#f0f0f0" },
    600: { value: "#949191" },
  },
  "bg.canvas": {
    default: { value: "gray.25" },
    _dark: { value: "gray.950" },
  },
  "bg.surface": {
    default: { value: "white" },
    _dark: { value: "gray.900" },
  },
  "bg.subtle": {
    default: { value: "gray.50" },
    _dark: { value: "gray.800" },
  },
  "bg.muted": {
    default: { value: "gray.100" },
    _dark: { value: "gray.700" },
  },

  "fg.default": {
    default: { value: "gray.900" },
    _dark: { value: "white" },
  },
  "fg.emphasized": {
    default: { value: "gray.700" },
    _dark: { value: "gray.200" },
  },
  "fg.muted": {
    default: { value: "gray.600" },
    _dark: { value: "gray.300" },
  },
  "fg.subtle": {
    default: { value: "gray.500" },
    _dark: { value: "gray.400" },
  },
  "fg.inverted": {
    default: { value: "white" },
    _dark: { value: "gray.950" },
  },

  "border.default": {
    default: { value: "gray.200" },
    _dark: { value: "gray.800" },
  },
  "border.emphasized": {
    default: { value: "gray.300" },
    _dark: { value: "gray.700" },
  },
  "border.active": {
    default: { value: "gray.400" },
    _dark: { value: "gray.600" },
  },

  "bg.accent.default": { value: "brand.600" },
  "bg.accent.subtle": { value: "brand.500" },
  "bg.accent.muted": { value: "brand.400" },

  "fg.accent.subtle": { value: "brand.100" },
  "fg.accent.muted": { value: "brand.50" },
  "fg.accent.default": { value: "white" },

  accent: {
    default: { value: "brand.500" },
    _dark: { value: "brand.200" },
  },
  success: {
    default: { value: "green.500" },
    _dark: { value: "green.200" },
  },
  error: {
    default: { value: "red.500" },
    _dark: { value: "red.200" },
  },
  purpleDark: {
    900: { value: "#2a254b" },
    800: { value: "#3c2b64" },
    700: { value: "#4b3780" },
  },
  pink: {
    400: { value: "#ff0080" },
  },
};
const config = defineConfig({
  globalCss: {
    body: { bg: "secondary.900", color: "white" },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-league-spartan)" },
        body: { value: "var(--font-league-spartan)" },
      },
      colors,
      // components: {
      //   Stepper: {
      //     baseStyle: {
      //       title: {
      //         color: "black",
      //       },
      //     },
      //   },
      //   GradientButton: {
      //     baseStyle: {
      //       bgGradient: "linear(to-r, pink.500, purple.500)",
      //       color: "white",
      //       _hover: {
      //         bgGradient: "linear(to-r, pink.600, purple.600)",
      //       },
      //     },
      //   },
      // },
    },
  },
});
const finalConfig = mergeConfigs(defaultConfig, config);
export const theme = createSystem(finalConfig);

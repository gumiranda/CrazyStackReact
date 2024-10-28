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

  accent: { value: "brand.500" },
  success: { value: "green.500" },
  error: { value: "red.500" },
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

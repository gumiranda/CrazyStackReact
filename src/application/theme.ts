import { extendTheme } from "@chakra-ui/react";
const colors = {
  primary: {
    500: "#9f7aea",
    600: "#6936d1",
  },
  secondary: {
    400: "#3f3f3f",
    500: "#2e2e2e",
    600: "#212121",
  },
  tertiary: {
    500: "#04D361",
  },
  grayscale: {
    500: "#f0f0f0",
    600: "#949191",
  },
};

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-league-spartan)",
    body: "var(--font-league-spartan)",
  },
  colors,
  styles: { global: { body: { bg: "secondary.900", color: "white" } } },
  sizes: {
    container: {
      sm: "320px",
    },
  },
  components: {
    Stepper: {
      baseStyle: {
        title: {
          color: "black",
        },
      },
    },
  },
});

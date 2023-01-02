import { ChakraProvider } from "application/providers/chakraProvider";
import { render } from "@testing-library/react";

export const renderWithTheme = (ui: JSX.Element) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

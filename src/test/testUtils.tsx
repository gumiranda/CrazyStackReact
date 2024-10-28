import { ChakraProvider } from "@/application/providers/chakraProvider";
import { render } from "@testing-library/react";
import React from "react";

export const renderWithTheme = (ui: React.ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

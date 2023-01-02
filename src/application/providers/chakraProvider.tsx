import { theme } from "application/theme";
import { ChakraProvider as ChakraProviderBase } from "@chakra-ui/react";
import { ReactElement } from "react";

export type ProviderProps = {
  children: ReactElement;
};
export const ChakraProvider = ({ children }: ProviderProps) => (
  <ChakraProviderBase theme={theme} resetCSS>
    {children}
  </ChakraProviderBase>
);

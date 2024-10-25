import { ReactElement } from "react";
import { theme } from "../theme";
import { ChakraProvider as Provider } from "@chakra-ui/react";
export type ProviderProps = {
  children: ReactElement;
};
export const ChakraProvider = ({ children }: ProviderProps) => (
  <Provider value={theme}>{children}</Provider>
);

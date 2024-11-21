import { Text as TextChakra } from "@chakra-ui/react";
export const Text = ({ children, ...rest }) => {
  return <TextChakra {...rest}>{children}</TextChakra>;
};

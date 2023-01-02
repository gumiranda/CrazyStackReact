import { Text as TextChakra, TextProps } from "@chakra-ui/react";
export const Text = ({ children, ...rest }: TextProps) => {
  return (
    <TextChakra {...rest} data-testid="TextTestId">
      {children}
    </TextChakra>
  );
};

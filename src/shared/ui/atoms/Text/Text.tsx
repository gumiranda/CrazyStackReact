import { Text as TextChakra } from "@chakra-ui/react";
export const Text = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <TextChakra ref={ref} {...rest} data-testid={datatestid ?? "TextTestId"}>
      {children}
    </TextChakra>
  );
};

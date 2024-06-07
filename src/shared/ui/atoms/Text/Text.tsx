import { Text as TextChakra, forwardRef } from "@chakra-ui/react";
export const Text_ = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <TextChakra ref={ref} {...rest} data-testid={datatestid ?? "TextTestId"}>
      {children}
    </TextChakra>
  );
};
export const Text = forwardRef(Text_);

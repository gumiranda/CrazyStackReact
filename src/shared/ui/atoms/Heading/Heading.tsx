import { Heading as HeadingChakra } from "@chakra-ui/react";
export const Heading = ({ children, fontSize, size, datatestid, ...rest }: any) => {
  return (
    <HeadingChakra
      {...rest}
      size={fontSize ?? size}
      data-testid={datatestid ?? "HeadingTestId"}
    >
      {children}
    </HeadingChakra>
  );
};

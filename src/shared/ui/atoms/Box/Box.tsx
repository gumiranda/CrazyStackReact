import { Box as BoxChakra, BoxProps } from "@chakra-ui/react";
export const Box = (
  { children, datatestid, ...rest }: BoxProps & { datatestid?: string },
  ref
) => {
  return (
    <BoxChakra ref={ref} {...rest} data-testid={datatestid ?? "BoxTestId"}>
      {children}
    </BoxChakra>
  );
};

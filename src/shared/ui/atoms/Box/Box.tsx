import { Box as BoxChakra, BoxProps, forwardRef } from "@chakra-ui/react";
export const Box_ = (
  { children, datatestid, ...rest }: BoxProps & { datatestid?: string },
  ref
) => {
  return (
    <BoxChakra ref={ref} {...rest} data-testid={datatestid ?? "BoxTestId"}>
      {children}
    </BoxChakra>
  );
};
export const Box = forwardRef(Box_);

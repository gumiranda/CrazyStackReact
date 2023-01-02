import { Box as BoxChakra, BoxProps } from "@chakra-ui/react";
export const Box = ({
  children,
  datatestid,
  ...rest
}: BoxProps & { datatestid?: string }) => {
  return (
    <BoxChakra {...rest} data-testid={datatestid ?? "BoxTestId"}>
      {children}
    </BoxChakra>
  );
};

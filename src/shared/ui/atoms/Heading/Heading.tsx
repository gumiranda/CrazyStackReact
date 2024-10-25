import { Heading as HeadingChakra } from "@chakra-ui/react";
export const Heading = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <HeadingChakra ref={ref} {...rest} data-testid={datatestid ?? "HeadingTestId"}>
      {children}
    </HeadingChakra>
  );
};

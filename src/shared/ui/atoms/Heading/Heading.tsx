import { Heading as HeadingChakra } from "@chakra-ui/react";
export const Heading = ({ children, datatestid, ...rest }: any) => {
  return (
    <HeadingChakra {...rest} data-testid={datatestid ?? "HeadingTestId"}>
      {children}
    </HeadingChakra>
  );
};

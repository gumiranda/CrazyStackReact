import { Heading as HeadingChakra, forwardRef } from "@chakra-ui/react";
export const Heading_ = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <HeadingChakra ref={ref} {...rest} data-testid={datatestid ?? "HeadingTestId"}>
      {children}
    </HeadingChakra>
  );
};
export const Heading = forwardRef(Heading_);

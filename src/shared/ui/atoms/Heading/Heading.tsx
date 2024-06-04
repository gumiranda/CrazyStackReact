import { Heading as HeadingChakra, HeadingProps } from "@chakra-ui/react";
export const Heading = ({ children, ...rest }: HeadingProps) => {
  return (
    <HeadingChakra {...rest} data-testid="HeadingTestId">
      {children}
    </HeadingChakra>
  );
};

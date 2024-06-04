import { Circle as CircleChakra } from "@chakra-ui/react";
export const Circle = ({ children, ...rest }: any) => {
  return (
    <CircleChakra {...rest} data-testid="CircleTestId">
      {children}
    </CircleChakra>
  );
};

import { Circle as CircleChakra, CircleProps } from "@chakra-ui/react";
export const Circle = ({ children, ...rest }: CircleProps) => {
  return (
    <CircleChakra {...rest} data-testid="CircleTestId">
      {children}
    </CircleChakra>
  );
};

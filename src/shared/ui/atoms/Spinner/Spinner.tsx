import { Spinner as SpinnerChakra, SpinnerProps } from "@chakra-ui/react";
export const Spinner = ({ children, ...rest }: SpinnerProps) => {
  return (
    <SpinnerChakra {...rest} data-testid="SpinnerTestId">
      {children}
    </SpinnerChakra>
  );
};

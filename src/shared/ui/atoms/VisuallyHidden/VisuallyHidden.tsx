import { VisuallyHidden as VisuallyHiddenChakra, VisuallyHiddenProps } from "@chakra-ui/react";
export const VisuallyHidden = ({ children, ...rest }: VisuallyHiddenProps) => {
  return (
    <VisuallyHiddenChakra {...rest} data-testid="VisuallyHiddenTestId">
      {children}
    </VisuallyHiddenChakra>
  );
};

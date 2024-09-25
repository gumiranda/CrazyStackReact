import { VisuallyHidden as VisuallyHiddenChakra } from "@chakra-ui/react";
export const VisuallyHidden = ({ children, ...rest }: any) => {
  return (
    <VisuallyHiddenChakra {...rest} data-testid="VisuallyHiddenTestId">
      {children}
    </VisuallyHiddenChakra>
  );
};

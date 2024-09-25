import { AspectRatio as AspectRatioChakra, AspectRatioProps } from "@chakra-ui/react";
export const AspectRatio = ({ children, ...rest }: AspectRatioProps) => {
  return (
    <AspectRatioChakra {...rest} data-testid="AspectRatioTestId">
      {children}
    </AspectRatioChakra>
  );
};

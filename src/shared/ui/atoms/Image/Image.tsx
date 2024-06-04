import { Image as ImageChakra, ImageProps } from "@chakra-ui/react";
export const Image = ({ children, ...rest }: ImageProps) => {
  return (
    <ImageChakra {...rest} data-testid="ImageTestId">
      {children}
    </ImageChakra>
  );
};

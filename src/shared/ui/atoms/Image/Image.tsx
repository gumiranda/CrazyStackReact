import { Image as ImageChakra, ImageProps } from "@chakra-ui/react";
export const Image = (props: ImageProps) => {
  return <ImageChakra {...props} data-testid="ImageTestId" />;
};
export const Img = (props: ImageProps) => {
  return <ImageChakra {...props} data-testid="ImgTestId" />;
};

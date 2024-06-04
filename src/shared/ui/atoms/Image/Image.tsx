import {
  Image as ImageChakra,
  ImageProps,
  ImgProps,
  Img as ImgChakra,
} from "@chakra-ui/react";
export const Image = (props: ImageProps) => {
  return <ImageChakra {...props} data-testid="ImageTestId" />;
};
export const Img = (props: ImageProps) => {
  return <ImgChakra {...props} data-testid="ImgTestId" />;
};

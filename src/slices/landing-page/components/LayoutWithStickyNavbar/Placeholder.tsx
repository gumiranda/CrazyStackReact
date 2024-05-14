import { Box, BoxProps } from "@chakra-ui/react";

export const Placeholder = (props: BoxProps) => {
  return <Box role="presentation" py="3" px="4" color="fg.accent.default" {...props} />;
};

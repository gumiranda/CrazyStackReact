import { Box } from "@chakra-ui/react";

export const List = ({ children, ...rest }) => {
  return (
    <Box as="li" {...rest} data-testid="ListTestId">
      {children}
    </Box>
  );
};

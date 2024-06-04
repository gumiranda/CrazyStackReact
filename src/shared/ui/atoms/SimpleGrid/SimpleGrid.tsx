import { SimpleGrid as SimpleGridChakra, SimpleGridProps } from "@chakra-ui/react";
export const SimpleGrid = ({ children, ...rest }: SimpleGridProps) => {
  return (
    <SimpleGridChakra {...rest} data-testid="SimpleGridTestId">
      {children}
    </SimpleGridChakra>
  );
};

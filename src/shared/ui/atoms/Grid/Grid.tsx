import { Grid as GridChakra, GridProps } from "@chakra-ui/react";
export const Grid = ({ children, ...rest }: GridProps) => {
  return (
    <GridChakra {...rest} data-testid="GridTestId">
      {children}
    </GridChakra>
  );
};

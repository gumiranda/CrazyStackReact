import { Grid as GridChakra, GridProps } from "@chakra-ui/react";
import { memo } from "react";
export const Grid_ = ({ children, ...rest }: GridProps) => {
  return (
    <GridChakra {...rest} data-testid="GridTestId">
      {children}
    </GridChakra>
  );
};

export const Grid = memo(Grid_);

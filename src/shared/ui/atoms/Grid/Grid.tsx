import { Grid as GridChakra } from "@chakra-ui/react";
import { memo } from "react";
export const Grid_ = ({ children = null, ...rest }) => {
  return (
    <GridChakra {...rest} data-testid="GridTestId">
      {children}
    </GridChakra>
  );
};

export const Grid = memo(Grid_);

import { Grid as GridChakra, GridProps } from "@chakra-ui/react";
import { forwardRef } from "react";
export const Grid_ = ({ children, ...rest }: GridProps, ref) => {
  return (
    <GridChakra {...rest} data-testid="GridTestId" ref={ref}>
      {children}
    </GridChakra>
  );
};

export const Grid = forwardRef(Grid_);

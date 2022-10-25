import { forwardRef, ForwardRefRenderFunction } from "react";
import { Button as ButtonChakra, ButtonProps } from "@chakra-ui/react";
const ButtonAtom: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { children, ...rest },
  ref
) => {
  return (
    <ButtonChakra ref={ref} {...rest} data-testid="ButtonTestId">
      {children}
    </ButtonChakra>
  );
};
export const Button = forwardRef(ButtonAtom);

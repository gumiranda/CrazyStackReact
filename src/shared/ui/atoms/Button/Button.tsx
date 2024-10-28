import { memo } from "react";
import { Button as ButtonChakra } from "@chakra-ui/react";
const ButtonAtom = ({ children = "", href = null, ...rest }) => {
  return (
    <ButtonChakra {...rest} data-testid="ButtonTestId">
      {children}
    </ButtonChakra>
  );
};
export const Button = memo(ButtonAtom);

import { Input as InputChakra } from "@chakra-ui/react";
import { memo } from "react";

const InputAtom = ({ name, ...rest }) => {
  return <InputChakra {...rest} data-testid="InputTestId" id={name} name={name} />;
};
export const Input = memo(InputAtom);

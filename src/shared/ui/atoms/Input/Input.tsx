import { Input as InputChakra, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { memo } from "react";
interface InputProps extends ChakraInputProps {
  name: string;
}
const InputAtom = ({ name, ...rest }) => {
  return <InputChakra {...rest} data-testid="InputTestId" id={name} name={name} />;
};
export const Input = memo(InputAtom);

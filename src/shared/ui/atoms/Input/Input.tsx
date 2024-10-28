import { Input as InputChakra, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { memo } from "react";
interface InputProps extends ChakraInputProps {
  name: string;
}
const InputAtom = ({ name, ...rest }, ref) => {
  return (
    <InputChakra {...rest} data-testid="InputTestId" id={name} name={name} ref={ref} />
  );
};
export const Input = memo(InputAtom);

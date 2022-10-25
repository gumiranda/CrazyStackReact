import { Input as InputChakra, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { ForwardRefRenderFunction, forwardRef } from "react";
interface InputProps extends ChakraInputProps {
  name: string;
}
const InputAtom: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, ...rest },
  ref
) => {
  return (
    <InputChakra {...rest} data-testid="InputTestId" id={name} name={name} ref={ref} />
  );
};
export const Input = forwardRef(InputAtom);

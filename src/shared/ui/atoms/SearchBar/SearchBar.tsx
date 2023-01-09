import {
  Input as InputChakra,
  InputProps as ChakraInputProps,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";
import { ForwardRefRenderFunction, forwardRef } from "react";
interface InputProps extends ChakraInputProps {
  name: string;
}
const InputAtom: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, ...rest },
  ref
) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <InputChakra
        {...rest}
        type="search"
        data-testid="InputTestId"
        id={name}
        name={name}
        ref={ref}
        pr="1.5rem"
      />
    </InputGroup>
  );
};
export const SearchBar = forwardRef(InputAtom);

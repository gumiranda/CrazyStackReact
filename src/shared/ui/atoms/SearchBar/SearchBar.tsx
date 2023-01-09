import { Input as InputChakra, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { ForwardRefRenderFunction, forwardRef } from "react";
interface InputProps extends ChakraInputProps {
  name: string;
}
const InputAtom: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, ...rest },
  ref
) => {
  const router = useRouter();
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && router?.query?.page) {
      const newurl = router?.route?.replace?.("[page]", router?.query?.page as any);
      if (event.target.value && router?.query?.page) {
        router.push({
          pathname: newurl,
          query: { name: event.target.value },
        });
      } else {
        router.push(newurl);
      }
    }
  };
  return (
    <InputChakra
      {...rest}
      type="search"
      data-testid="InputTestId"
      id={name}
      name={name}
      ref={ref}
      onKeyDown={handleKeyDown}
      pr="1.5rem"
    />
  );
};
export const SearchBar = forwardRef(InputAtom);

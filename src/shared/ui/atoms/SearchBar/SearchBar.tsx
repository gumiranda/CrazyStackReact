//@ts-nocheck
import { Input as InputChakra, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
interface InputProps extends ChakraInputProps {
  name: string;
}
const InputAtom = ({ name, ...rest }, ref) => {
  const router = useRouter();
  const handleKeyDown = (event: any) => {
    const newurl = router?.route?.replace?.("[page]", router?.query?.page as any);
    if (event.target.value && router?.query?.page) {
      router.push({ pathname: newurl, query: { text: event.target.value } });
    } else {
      router.push(newurl);
    }
  };
  return (
    <InputChakra
      {...rest}
      type="search"
      data-testid="InputSearchId"
      id={name}
      ref={ref}
      onKeyDown={handleKeyDown}
      pr="1.5rem"
    />
  );
};
export const SearchBar = memo(InputAtom);

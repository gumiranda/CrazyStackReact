import { VStack as VStackChakra, forwardRef } from "@chakra-ui/react";
export const VStack_ = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <VStackChakra ref={ref} {...rest} data-testid={datatestid ?? "VStackTestId"}>
      {children}
    </VStackChakra>
  );
};
export const VStack = forwardRef(VStack_);

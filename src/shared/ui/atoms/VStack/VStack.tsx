import { VStack as VStackChakra } from "@chakra-ui/react";
export const VStack = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <VStackChakra ref={ref} {...rest} data-testid={datatestid ?? "VStackTestId"}>
      {children}
    </VStackChakra>
  );
};

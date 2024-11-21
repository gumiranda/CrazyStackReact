import { VStack as VStackChakra } from "@chakra-ui/react";
export const VStack = ({ children, datatestid, ...rest }: any) => {
  return (
    <VStackChakra {...rest} data-testid={datatestid ?? "VStackTestId"}>
      {children}
    </VStackChakra>
  );
};

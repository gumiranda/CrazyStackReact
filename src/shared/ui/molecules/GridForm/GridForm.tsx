import { SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";
interface GridFormProps {
  children: ReactNode;
}

export const GridForm = ({ children }: GridFormProps) => {
  return (
    <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
      {children}
    </SimpleGrid>
  );
};

import { SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";
interface GridFormProps {
  children: ReactNode;
  [key: string]: any;
}

export const GridForm = ({ children, ...props }: GridFormProps) => {
  return (
    <SimpleGrid minChildWidth="240px" gap={["6", "8"]} w="100%" {...props}>
      {children}
    </SimpleGrid>
  );
};

import { Box, Text } from "shared/ui/atoms";
import { ReactNode } from "react";
import { HStack } from "@chakra-ui/react";
interface NavSectionProps {
  title: string;
  children: ReactNode;
}
export const NavSection = ({ title, children, ...rest }: NavSectionProps) => {
  return (
    <Box {...rest} datatestid="NavSectionTestId">
      <Text fontWeight={"bold"} color="purple.400" fontSize="small">
        {title}
      </Text>
      <HStack spacing="4" mt="8" align="stretch">
        {children}
      </HStack>
    </Box>
  );
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { Box, Text, HStack, Stack } from "shared/ui";
import { ReactNode } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
interface NavSectionProps {
  title: string;
  children: ReactNode;
}
export const NavSection = ({ title, children, ...rest }: NavSectionProps) => {
  return (
    <Box {...rest} datatestid="NavSectionTestId">
      <CustomStack>{children}</CustomStack>
    </Box>
  );
};
const CustomStack = ({ children }: any) => {
  const isDesktopVersion = useBreakpointValue({ base: false, lg: true });
  if (isDesktopVersion) {
    return (
      <HStack spacing="4" mt="8" align="stretch">
        {children}
      </HStack>
    );
  }
  return (
    <Stack spacing="4" mt="8" align="stretch">
      {children}
    </Stack>
  );
};

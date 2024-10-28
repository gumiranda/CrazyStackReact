/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { Box, Stack, useBreakpointValue } from "@/shared/ui";
import { ReactNode } from "react";
interface NavSectionProps {
  title: string;
  children: ReactNode;
}
export const NavSection = ({ title, children, ...rest }: NavSectionProps) => {
  return (
    <Box {...rest}>
      <CustomStack>{children}</CustomStack>
    </Box>
  );
};
const CustomStack = ({ children }: any) => {
  const isDesktopVersion = useBreakpointValue("(min-width: 768px)");
  // if (isDesktopVersion) {
  //   return (
  //     <HStack gap="4" mt="8" align="stretch">
  //       {children}
  //     </HStack>
  //   );
  // }
  return (
    <Stack gap="4" mt="8" align="stretch">
      {children}
    </Stack>
  );
};

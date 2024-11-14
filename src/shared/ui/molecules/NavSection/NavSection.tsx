/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { Box, Stack } from "@/shared/ui";
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
  return (
    <Stack gap="4" mt="8" align="stretch">
      {children}
    </Stack>
  );
};

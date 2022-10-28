import { Box, Stack, Text } from "shared/ui/atoms";
import { ReactNode } from "react";
interface NavSectionProps {
  title: string;
  children: ReactNode;
}
export const NavSection = ({ title, children, ...rest }: NavSectionProps) => {
  return (
    <Box {...rest} data-testid="NavSectionTestId">
      <Text fontWeight={"bold"} color="purple.400" fontSize="small">
        {title}
      </Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
};

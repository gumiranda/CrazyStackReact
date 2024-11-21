"use client";
import { Box, Flex, HStack, Logo, SelectTranslate, ToggleButton } from "@/shared/ui";

export const NavBarWithCallToAction = ({ children }) => {
  return (
    <Box as="section">
      <Box position="relative" zIndex="tooltip">
        <Flex p="0.9rem" justify="space-between" align="center">
          <Logo haveLink={false} marginBottom={0} />
          <HStack>
            <SelectTranslate />
            {children}
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

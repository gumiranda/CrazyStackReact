"use client";
import { useUi } from "@/shared/libs";
import { Box, Flex, HStack, Logo, SelectTranslate, ToggleButton } from "@/shared/ui";
import { MobileDrawer } from "@/widgets/NavBar/MobileNavbar";

export const NavBarWithCallToAction = () => {
  const mobileNavbar = useUi();

  return (
    <Box as="section">
      <Box position="relative" zIndex="tooltip">
        <Flex p="0.9rem" justify="space-between" align="center">
          <Logo haveLink={false} marginBottom={0} />
          <HStack>
            <SelectTranslate />
            <ToggleButton
              onClick={mobileNavbar.onToggle as any}
              open={mobileNavbar.open}
              aria-label="Mostrar menu"
            />
          </HStack>
          <MobileDrawer open={mobileNavbar.open} onClose={mobileNavbar.onClose} />
        </Flex>
      </Box>
    </Box>
  );
};

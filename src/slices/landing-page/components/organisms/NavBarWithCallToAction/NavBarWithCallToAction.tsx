"use client";
import { useUi } from "@/shared/libs";
import { Box, Flex, HStack, Logo, SelectTranslate, ToggleButton } from "@/shared/ui";
import { MobileDrawer } from "@/widgets/NavBar/MobileNavbar";
import { useState } from "react";

export const NavBarWithCallToAction = () => {
  const [open, setOpen] = useState(false);
  const mobileNavbar = {
    open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    onToggle: () => setOpen(!open),
  };
  return (
    <Box as="section">
      <Box position="relative" zIndex="tooltip">
        <Flex p="0.9rem" justify="space-between" align="center">
          <Logo haveLink={false} marginBottom={0} />
          <HStack>
            <SelectTranslate />
          </HStack>
          {/* <MobileDrawer open={mobileNavbar.open} onClose={mobileNavbar.onClose} /> */}
        </Flex>
      </Box>
    </Box>
  );
};

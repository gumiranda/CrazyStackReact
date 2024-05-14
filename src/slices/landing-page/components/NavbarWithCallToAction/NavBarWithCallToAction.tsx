import { Box, Container, HStack, useDisclosure } from "@chakra-ui/react";
import { MobileDrawer } from "./MobileNavbar";
import { ToggleButton } from "./ToggleButton";
import { Flex, Logo, SelectTranslate } from "@/shared/ui";

export const NavBarWithCallToAction = () => {
  const mobileNavbar = useDisclosure();
  return (
    <Box as="section">
      <Box borderBottomWidth="1px" position="relative" zIndex="tooltip">
        <Flex p="4" justify="space-between" align={"center"}>
          <Logo haveLink={false} marginBottom={0} />
          <HStack>
            <SelectTranslate />
            <ToggleButton
              onClick={mobileNavbar.onToggle}
              isOpen={mobileNavbar.isOpen}
              aria-label="Open Menu"
            />
          </HStack>

          <MobileDrawer isOpen={mobileNavbar.isOpen} onClose={mobileNavbar.onClose} />
        </Flex>
      </Box>
    </Box>
  );
};

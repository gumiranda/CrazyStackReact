import {
  Box,
  Flex,
  HStack,
  Logo,
  SelectTranslate,
  ToggleButton,
  useDisclosure,
} from "@/shared/ui";
import { MobileDrawer } from "@/widgets/NavBar/MobileNavbar";

export const NavBarWithCallToAction = () => {
  const mobileNavbar = useDisclosure();

  return (
    <Box as="section">
      <Box position="relative" zIndex="tooltip">
        <Flex p="0.9rem" justify="space-between" align="center">
          <Logo haveLink={false} marginBottom={0} />
          <HStack>
            <SelectTranslate />
            <ToggleButton
              onClick={mobileNavbar.onToggle}
              isOpen={mobileNavbar.isOpen}
              aria-label="Mostrar menu"
            />
          </HStack>
          <MobileDrawer isOpen={mobileNavbar.isOpen} onClose={mobileNavbar.onClose} />
        </Flex>
      </Box>
    </Box>
  );
};

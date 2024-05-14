import { Box } from "@chakra-ui/react";
import { NavBarWithCallToAction } from "../NavbarWithCallToAction/NavBarWithCallToAction";

export const Navbar = () => {
  return (
    <Box
      as="nav"
      role="navigation"
      position="sticky"
      top="0"
      zIndex="docked"
      bg="secondary.500"
    >
      <NavBarWithCallToAction />
    </Box>
  );
};

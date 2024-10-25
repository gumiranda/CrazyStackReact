// @ts-nocheck

import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerBody,
} from "@chakra-ui/react";
import { useSidebarDrawer } from "@/shared/libs";
import { ScrollbarCss } from "@/shared/css";

type SidebarProps = {
  children?: React.ReactNode;
  title: string;
};
export const Sidebar = ({ title = "Navegação", children }: SidebarProps) => {
  const { open, onClose } = useSidebarDrawer();
  const isDrawerSidebar = true; //useBreakpointValue({ base: true, lg: false });
  if (isDrawerSidebar) {
    return (
      <Drawer open={open} onClose={onClose} data-testid="SidebarTestId" placement="left">
        <DrawerOverlay>
          <DrawerContent bg="secondary.500" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>{title}</DrawerHeader>
            <DrawerBody css={ScrollbarCss}>{children}</DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
  return (
    <Box
      as="aside"
      marginTop={-5}
      marginLeft={4}
      marginRight={4}
      marginBottom={2}
      data-testid="SidebarTestId"
    >
      {children}
    </Box>
  );
};

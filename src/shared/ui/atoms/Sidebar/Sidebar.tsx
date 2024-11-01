import { Box, Button } from "@chakra-ui/react";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollbarCss } from "@/shared/css";
import { useState } from "react";

type SidebarProps = {
  children?: React.ReactNode;
  title: string;
};
export const Sidebar = ({ title = "Navegação", children }: SidebarProps) => {
  const [open, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const isDrawerSidebar = true; //useBreakpointValue({ base: true, lg: false });
  if (isDrawerSidebar) {
    return (
      <DrawerRoot open={open} defaultOpen={false}>
        <DrawerBackdrop />{" "}
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody css={ScrollbarCss}>{children}</DrawerBody>
        </DrawerContent>
      </DrawerRoot>
      // <DrawerRoot open={open} data-testid="SidebarTestId">
      //   <DrawerTrigger asChild>
      //     <Button variant="outline" size="sm">
      //       Open Drawer
      //     </Button>
      //   </DrawerTrigger>
      //   <DrawerBackdrop />
      //   <DrawerContent bg="secondary.500" p="4">
      //     <DrawerCloseTrigger mt="6" />
      //     <DrawerHeader>{title}</DrawerHeader>
      //     <DrawerBody css={ScrollbarCss}>{children}</DrawerBody>
      //   </DrawerContent>
      // </DrawerRoot>
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

import { Box, IconButton } from "@chakra-ui/react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollbarCss } from "@/shared/css";
import { useState } from "react";
import { Icon } from "../Icon";
import { RiMenuLine } from "react-icons/ri";

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
      <DrawerRoot
        placement={"start"}
        //onOpenChange={(e) => setIsOpen(e.open)}
      >
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <IconButton
            aria-label="Open sidebar"
            fontSize="24"
            children={<Icon as={RiMenuLine} />}
            variant="ghost"
            color={"white"}
            mr="1"
            mt={2}
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </DrawerRoot>
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

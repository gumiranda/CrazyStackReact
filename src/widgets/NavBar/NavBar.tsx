import { Header, Flex, Logo, Profile, NotificationsNav } from "shared/ui";
import { useBreakpointValue, Icon, IconButton } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useAuth, useSidebarDrawer } from "shared/libs";
export const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const { onOpen } = useSidebarDrawer();
  const isDesktopVersion = useBreakpointValue({ base: false, lg: true });
  return (
    <Header>
      {isAuthenticated && !isDesktopVersion && (
        <IconButton
          aria-label="Open sidebar"
          fontSize="24"
          icon={<Icon as={RiMenuLine} />}
          variant="unstyled"
          onClick={onOpen}
          mr="1"
        />
      )}
      <Logo />
      {isAuthenticated && (
        <Flex align="center" ml="auto">
          <NotificationsNav />
          <Profile showProfileData={isDesktopVersion} />
        </Flex>
      )}
    </Header>
  );
};

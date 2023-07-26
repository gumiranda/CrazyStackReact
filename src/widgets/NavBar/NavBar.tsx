//@ts-nocheck
import { Header, Flex, Logo, Profile, NotificationsNav, SearchBar } from "shared/ui";
import { useBreakpointValue, Icon, IconButton, useMediaQuery } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useAuth, useSidebarDrawer } from "shared/libs";
export const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const { onOpen } = useSidebarDrawer();
  const isDesktopVersion = useBreakpointValue({ base: false, lg: true });
  const [isLargerThan560] = useMediaQuery("(min-width: 560px)");
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
      {isLargerThan560 && (
        <SearchBar placeholder="Pesquise por nome..." name="search" width="auto" />
      )}
      {isAuthenticated && (
        <Flex align="center" ml="auto">
          <NotificationsNav />
          <Profile showProfileData={isDesktopVersion} />
        </Flex>
      )}
    </Header>
  );
};

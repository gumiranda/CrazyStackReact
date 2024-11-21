"use client";
//@ts-nocheck
import { Header, Flex, Logo, Profile, SelectTranslate } from "@/shared/ui";
import { useAuth } from "@/shared/libs";

export const NavBar = ({ children, showLogo = true }) => {
  const { isAuthenticated } = useAuth() || {};

  return (
    <Header>
      <Flex alignItems={"center"} w={"100%"}>
        {isAuthenticated && <>{children}</>}
        <Logo marginBottom={0} />
        {/* {isLargerThan560 && (
          <SearchBar placeholder="Pesquise por nome..." name="search" width="auto" />
        )} */}
        {isAuthenticated && (
          <Flex align="center" ml="auto">
            {/* <NotificationsNav /> */}
            <SelectTranslate />
            <Profile />
          </Flex>
        )}
      </Flex>
    </Header>
  );
};

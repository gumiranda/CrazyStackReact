"use client";
//@ts-nocheck
import { Header, Flex, Logo, Profile, SelectTranslate } from "@/shared/ui";
import { Icon, IconButton } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useAuth } from "@/shared/libs";

export const NavBar = ({ showLogo = true }) => {
  const { isAuthenticated } = useAuth() || {};

  return (
    <Header>
      <Flex alignItems={"center"} w={"100%"}>
        {isAuthenticated && (
          <IconButton
            aria-label="Open sidebar"
            fontSize="24"
            children={<Icon as={RiMenuLine} />}
            variant="ghost"
            mr="1"
            mt={2}
          />
        )}
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

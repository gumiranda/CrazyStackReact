"use client";
import { Logo } from "../../molecules/Logo";
import { NavBar, SidebarPanel } from "@/widgets";
import { Suspense } from "react";
import { Spinner, Flex } from "@chakra-ui/react";
export const Layout = ({ children, logoOnHeader = true }: any) => {
  return (
    <>
      <NavBar showLogo={logoOnHeader} />
      <SidebarPanel />
      {logoOnHeader === false && <Logo haveLink={false} />}
      <Suspense
        fallback={
          <Flex
            w={"100%"}
            h="85vh"
            align={"center"}
            justify={"center"}
            bg="purple.800"
            color="white"
          >
            <Spinner size="xl" />
          </Flex>
        }
      />
      {children}
    </>
  );
};

"use client";

import { Flex } from "@/shared/ui";
import { LayoutWithStickyNavbar } from "../components/templates";

export const SalesLandingPage = () => {
  return (
    <Flex direction={"column"} flex="1">
      <LayoutWithStickyNavbar.Navbar />
      <LayoutWithStickyNavbar.Main />
      <LayoutWithStickyNavbar.Footer />
    </Flex>
  );
};

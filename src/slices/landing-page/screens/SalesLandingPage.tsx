"use client";

import { Flex } from "@/shared/ui";
import { Navbar } from "../components/LayoutWithStickyNavbar/Navbar";
import { Main } from "../components/LayoutWithStickyNavbar/Main";
import { Footer } from "../components/LayoutWithStickyNavbar/Footer";

export const SalesLandingPage = () => {
  return (
    <Flex direction="column" flex="1">
      <Navbar />
      <Main />
      <Footer />
    </Flex>
  );
};

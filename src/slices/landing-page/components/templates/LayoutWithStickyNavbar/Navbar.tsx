"use client";
import { Box } from "@/shared/ui";
import { NavBarWithCallToAction } from "../../organisms/NavBarWithCallToAction";
import { useEffect, useState } from "react";
import { MobileDrawer } from "@/widgets/NavBar/MobileNavbar";

export const Navbar = () => {
  const [bgOpacity, setBgOpacity] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 90) {
        const maxScroll = window.innerHeight + 100; // 100vh
        const opacity = Math.min(scrollY / maxScroll, 1) - 0.16;
        setBgOpacity(opacity);
      } else {
        setBgOpacity(0.16);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [open, setOpen] = useState(false);
  const mobileNavbar = {
    open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    onToggle: () => setOpen(!open),
  };
  return (
    <>
      <Box
        as="nav"
        role="navigation"
        position="sticky"
        top="0"
        bgImage="url(header.png)"
        bgPos="top"
        bgRepeat={"no-repeat"}
        bgSize="auto"
        zIndex="docked"
      >
        <Box bg={`rgba(46,46,46, ${bgOpacity})`} transition="background-color 0.3s">
          <NavBarWithCallToAction>
            <MobileDrawer open={mobileNavbar.open} onClose={mobileNavbar.onClose} />
          </NavBarWithCallToAction>
        </Box>
      </Box>
    </>
  );
};

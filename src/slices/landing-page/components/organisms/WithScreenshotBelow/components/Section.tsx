import { Box } from "@/shared/ui";
import { motion } from "framer-motion";

const MotionBox = motion(Box as any);

export const Section = ({ children }) => {
  return (
    <MotionBox
      as="section"
      bg="secondary.600"
      color="white"
      py="7.5rem"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      bgImage="url('header.png')"
      bgPos="center"
      bgRepeat="no-repeat"
      minH="100vh"
      bgSize="cover"
      mt={{ base: "-4rem", md: "-4.8rem" }}
    >
      <Box maxW={{ base: "xl", md: "5xl" }} mx="auto" px={{ base: 6, md: 8 }}>
        {children}
      </Box>
    </MotionBox>
  );
};

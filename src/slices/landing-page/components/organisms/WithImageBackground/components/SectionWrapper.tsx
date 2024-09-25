import { Box } from "@/shared/ui";

export const SectionWrapper = ({ children }) => {
  return (
    <Box py="32" position="relative" zIndex={1}>
      <Box
        color="white"
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
      >
        <Box maxW="xl">{children}</Box>
      </Box>
    </Box>
  );
};

import { Box, SimpleGrid, Stack } from "@/shared/ui";
import { HeroImage, HeroSubtitle, HeroTitle, SignUpForm } from "./components";

export const HeroWithSignUp = () => {
  return (
    <Box m={10}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={16}>
        <Stack spacing={{ base: 8, md: 12 }} justifyContent="center">
          <Stack spacing={{ base: 4, md: 6 }}>
            <HeroTitle />
            <HeroSubtitle />
          </Stack>
          <SignUpForm />
        </Stack>
        <HeroImage />
      </SimpleGrid>
    </Box>
  );
};
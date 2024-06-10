import { Box } from "@/shared/ui";
import {
  ButtonSection,
  HeadingSection,
  ImageBackground,
  SectionWrapper,
} from "./components";

export const WithImageBackground = () => {
  return (
    <Box bg="gray.800" as="section" minH="140px" position="relative">
      <SectionWrapper>
        <HeadingSection />
        <ButtonSection />
      </SectionWrapper>
      <ImageBackground />
    </Box>
  );
};

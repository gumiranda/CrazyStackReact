import { Box } from "@/shared/ui";
import { ButtonSection, HeadingSection, ScreenshotSection, Section } from "./components";

export const WithScreenshotBelow = () => {
  return (
    <Box>
      <Section>
        <HeadingSection />
        <ButtonSection />
        <ScreenshotSection />
      </Section>
    </Box>
  );
};

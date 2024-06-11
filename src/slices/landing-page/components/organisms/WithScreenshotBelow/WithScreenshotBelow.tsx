import { Box } from "@/shared/ui";
import { HeadingSection, ScreenshotSection, Section } from "./components";

export const WithScreenshotBelow = () => {
  return (
    <Box>
      <Section>
        <HeadingSection />
        <ScreenshotSection />
      </Section>
    </Box>
  );
};

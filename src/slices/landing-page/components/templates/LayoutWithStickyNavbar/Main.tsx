import { Flex } from "@/shared/ui";
import { CookieFooter } from "../../molecules/CookiesPreferences";
import { FAQSection } from "../../organisms/FAQSection";
import { SectionHowItWorks } from "../../organisms/SectionHowItWorks";
import { SectionFeatures } from "../../organisms/SectionFeatures";
import { WithImageBackground } from "../../organisms/WithImageBackground";
import { HeroWithSignUp } from "../../organisms/HeroWithSignUp";
import { HeroTop } from "../../organisms/HeroTop";
import { PricingSection } from "../../organisms/PricingSection";
import { WithScreenshotBelow } from "../../organisms/WithScreenshotBelow";

export const Main = (props: any) => {
  return (
    <Flex as="main" role="main" direction="column" flex="1" py="0" {...props}>
      <WithScreenshotBelow />
      <HeroTop />
      <HeroWithSignUp />
      <WithImageBackground />
      <SectionFeatures />
      <SectionHowItWorks />
      <PricingSection />
      <FAQSection />
      <CookieFooter />
    </Flex>
  );
};

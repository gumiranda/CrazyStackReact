import { config } from "@/application/config";
import { Box, Flex, Text, ChakraLink, Image } from "@/shared/ui";
import { CookieFooter } from "../../molecules/CookiesPreferences";
import { FAQSection } from "../../organisms/FAQSection";
import { SectionHowItWorks } from "../../organisms/SectionHowItWorks";
import { SectionFeatures } from "../../organisms/SectionFeatures";
import { WithImageBackground } from "../../organisms/WithImageBackground";
import { HeroWithSignUp } from "../../organisms/HeroWithSignUp";
import { HeroTop } from "../../organisms/HeroTop";

export const Main = (props: any) => {
  return (
    <Flex as="main" role="main" direction="column" flex="1" py="0" {...props}>
      <HeroTop />
      <HeroWithSignUp />
      <WithImageBackground />
      <SectionFeatures />
      <SectionHowItWorks />
      <FAQSection />
      <CookieFooter />
    </Flex>
  );
};

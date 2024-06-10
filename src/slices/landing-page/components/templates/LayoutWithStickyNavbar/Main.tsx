import { config } from "@/application/config";
import { Box, Flex, Text, ChakraLink, Image } from "@/shared/ui";
import { CookieFooter } from "../../molecules/CookiesPreferences";
import { FAQSection } from "../../organisms/FAQSection";
import { SectionHowItWorks } from "../../organisms/SectionHowItWorks";

export const Main = (props: any) => {
  return (
    <Flex as="main" role="main" direction="column" flex="1" py="0" {...props}>
      <SectionHowItWorks />
      <FAQSection />
      <CookieFooter />
    </Flex>
  );
};

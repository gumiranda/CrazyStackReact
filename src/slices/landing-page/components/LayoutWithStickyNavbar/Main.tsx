import { Flex, FlexProps } from "@chakra-ui/react";
import { PageHeaderWithCTA } from "../PageHeaderWithCTA/PageHeaderWithCTA";
import { WithScreenshotBelow } from "../WithScreenshotBelow/WithScreenshotBelow";
import { WithImageBackground } from "../WithImageBackground/WithImageBackground";
import { HeroWithSignUp } from "../HeroWithSignUp/HeroWithSignUp";

export const Main = (props: FlexProps) => {
  return (
    <Flex as="main" role="main" direction="column" flex="1" py="0" {...props}>
      <WithImageBackground />
      <WithScreenshotBelow />
      <HeroWithSignUp />
      <PageHeaderWithCTA />
    </Flex>
  );
};

import { Box, Container, StepsCompletedContent } from "@chakra-ui/react";
import { StepsContent, StepsItem, StepsList, StepsRoot } from "@/components/ui/steps";
import { useBreakpointValue } from "../Hooks";
import React from "react";
export const Stepper = ({ children, activeStep, steps, stepsComponents }: any) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  if (steps?.length < 1) {
    return null;
  }
  return (
    <Container maxW={"5xl"}>
      <Box
        display={isMobile ? "flex" : "inline"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <StepsRoot
          defaultValue={1}
          count={steps.length}
          orientation={isMobile ? "vertical" : "horizontal"}
          colorPalette="purple"
          defaultStep={activeStep}
          step={activeStep}
        >
          <StepsList m={8}>
            {steps?.map?.((step: any, index: number) => (
              <StepsItem
                key={index}
                index={index}
                title={step.title}
                description={step.description}
                icon={step.icon}
                mt={index > 0 && isMobile ? 4 : 0}
              />
            ))}
          </StepsList>
          {steps?.map?.((step: any, index: number) => (
            <StepsContent key={index} index={index}>
              {stepsComponents[index]}
            </StepsContent>
          ))}
          <StepsCompletedContent>
            {stepsComponents[steps.length - 1]}
          </StepsCompletedContent>
        </StepsRoot>
      </Box>
      {children}
    </Container>
  );
};

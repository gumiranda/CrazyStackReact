import { Box, useBreakpointValue, Container } from "@chakra-ui/react";
export const Stepper = ({ children, activeStep, steps, stepsComponents }: any) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const StepNumberAny = StepNumber as (props: any) => any;
  return (
    <Container maxW={"5xl"}>
      <Box
        display={isMobile ? "flex" : "inline"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {activeStep < steps.length && (
          <StepperChakra
            orientation={isMobile ? "vertical" : "horizontal"}
            m={8}
            height={isMobile ? "200px" : "auto"}
            index={activeStep}
            colorPalette="tertiary"
          >
            {steps.map((step: any, index: number) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumberAny mt={1} color="primary.500" />}
                    active={<StepNumberAny mt={1} color="tertiary.500" />}
                  />
                </StepIndicator>
                <Box flexShrink={"0"}>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
              </Step>
            ))}
          </StepperChakra>
        )}
      </Box>
      {stepsComponents[activeStep]}
      {children}
    </Container>
  );
};

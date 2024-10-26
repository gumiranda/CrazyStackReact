import { Box, Container } from "@chakra-ui/react";
import {
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from "@/components/ui/steps";
import { useBreakpointValue } from "../Hooks";
export const Stepper = ({ children, activeStep, steps, stepsComponents }: any) => {
  const isMobile = useBreakpointValue("(max-width: 768px)");
  return (
    <Container maxW={"5xl"}>
      <Box
        display={isMobile ? "flex" : "inline"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {activeStep < steps.length && (
          <StepsRoot
            orientation={isMobile ? "vertical" : "horizontal"}
            m={8}
            height={isMobile ? "200px" : "auto"}
            colorPalette="tertiary"
          >
            <StepsList>
              {steps.map((step: any, index: number) => (
                <StepsItem index={activeStep}>
                  {/* <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumberAny mt={1} color="primary.500" />}
                      active={<StepNumberAny mt={1} color="tertiary.500" />}
                    />
                  </StepIndicator> */}
                  <StepsContent index={index}>
                    {/* <StepTitle> */}
                    {step.title}
                    {/* </StepTitle>
                    <StepDescription> */}
                    {step.description}
                    {/* </StepDescription> */}
                  </StepsContent>
                </StepsItem>
              ))}
            </StepsList>
            <StepsPrevTrigger />
            <StepsNextTrigger />
          </StepsRoot>
        )}
      </Box>
      {stepsComponents[activeStep]}
      {children}
    </Container>
  );
};

"use client";
import { useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export { useBreakpointValue, useDisclosure };
export const useSteps = ({ index, count }) => {
  const [activeStep, setActiveStep] = useState(index);

  const nextActiveStep = () => setActiveStep((prev) => prev + 1);
  const prevActiveStep = () => setActiveStep((prev) => prev - 1);
  return { activeStep, setActiveStep, nextActiveStep, prevActiveStep };
};

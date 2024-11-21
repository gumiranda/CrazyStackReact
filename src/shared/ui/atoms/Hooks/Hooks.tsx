"use client";
import { useBreakpointValue } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { useMedia } from "react-use";
export { useBreakpointValue, useDisclosure };
export const useSteps = ({ index, count }) => {
  const [activeStep, setActiveStep] = useState(index);

  const nextActiveStep = () => setActiveStep((prev) => prev + 1);
  const prevActiveStep = () => setActiveStep((prev) => prev - 1);
  return { activeStep, setActiveStep, nextActiveStep, prevActiveStep };
};

function useDisclosure(initialState = false) {
  const [open, setOpen] = useState(initialState);

  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  const onToggle = useCallback(() => setOpen((prev) => !prev), []);

  return { open, isOpen: open, onOpen, onClose, onToggle };
}

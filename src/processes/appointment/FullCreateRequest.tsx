"use client";
import { Box, Stepper, Text } from "@/shared/ui";
import { StepRequestProvider } from "./context/StepRequest.context";
import { StepClient } from "./steps/StepClient";
import { StepDate } from "./steps/StepDate";
import { StepServiceProfessional } from "./steps/StepServiceProfessional";
import { StepSuccess } from "./steps/StepSuccess";
import { useSteps } from "@chakra-ui/react";
const steps = [
  { title: "Cliente", description: "Nome e telefone" },
  { title: "Profissional e Serviço", description: "Selecione o prestador e o serviço" },
  { title: "Data", description: "Selecione dia e horário" },
];
export const FullCreateRequestPage = ({ owners, clients }) => {
  const { activeStep, setActiveStep } = useSteps({ index: 0, count: steps.length });
  const stepsComponents = [
    <StepClient key={1} userList={clients} setActiveStep={setActiveStep} />,
    <StepServiceProfessional setActiveStep={setActiveStep} />,
    <StepDate setActiveStep={setActiveStep} />,
    <StepSuccess />,
  ];
  return (
    <Box
      backgroundColor="white"
      w="100%"
      minH={"78vh"}
      borderRadius={14}
      position="absolute"
    >
      {activeStep < steps.length && (
        <Text
          color="gray.800"
          fontWeight={"600"}
          mt={4}
          textAlign={"center"}
          fontSize="2xl"
        >
          Criar agendamento
        </Text>
      )}
      <Stepper activeStep={activeStep} steps={steps} stepsComponents={stepsComponents} />
    </Box>
  );
};
export const FullCreateRequest = (props) => {
  return (
    <StepRequestProvider>
      <FullCreateRequestPage {...props} />
    </StepRequestProvider>
  );
};

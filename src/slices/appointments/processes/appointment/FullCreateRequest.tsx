"use client";
import { Box, Stepper, Text, useSteps } from "@/shared/ui";
import { StepRequestProvider } from "./context/StepRequest.context";
import { StepClient } from "./steps/StepClient";
import { StepDate } from "./steps/StepDate";
import { StepServiceProfessional } from "./steps/StepServiceProfessional";
import { StepSuccess } from "./steps/StepSuccess";
import { useTranslation } from "react-i18next";

export const FullCreateRequestPage = ({ owners, clients, clientUsers }) => {
  const { t } = useTranslation(["PAGES"]);
  const steps = [
    {
      title: t("PAGES:NEW_APPOINTMENT.client", {
        defaultValue: "Cliente",
      }),
      description: t("PAGES:NEW_APPOINTMENT.nameAndPhone", {
        defaultValue: "Nome e telefone",
      }),
    },
    {
      title: t("PAGES:NEW_APPOINTMENT.professionalAndService", {
        defaultValue: "Profissional e Serviço",
      }),
      description: t("PAGES:NEW_APPOINTMENT.selectProfessionalAndService", {
        defaultValue: "Selecione o prestador e o serviço",
      }),
    },
    {
      title: t("PAGES:NEW_APPOINTMENT.date", {
        defaultValue: "Data",
      }),
      description: t("PAGES:NEW_APPOINTMENT.time", {
        defaultValue: "Selecione dia e horário",
      }),
    },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const stepsComponents = [
    <StepClient
      key={1}
      userList={clientUsers}
      clientList={clients}
      setActiveStep={setActiveStep}
    />,
    <StepServiceProfessional
      key={2}
      ownerSelected={owners?.owners?.[0]}
      setActiveStep={setActiveStep}
    />,
    <StepDate key={3} setActiveStep={setActiveStep} currentOwner={owners?.owners?.[0]} />,
    <StepSuccess
      key={4}
      setActiveStep={setActiveStep}
      title={t("PAGES:NEW_APPOINTMENT.confirmAppointment", {
        defaultValue: "Confirmar agendamento",
      })}
      content={t("PAGES:NEW_APPOINTMENT.confirmAppointmentMessage", {
        defaultValue:
          "Verifique os dados e confirme o agendamento clicando no botão abaixo.",
      })}
    />,
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
          {t("PAGES:NEW_APPOINTMENT.title", {
            defaultValue: "Criar agendamento",
          })}
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

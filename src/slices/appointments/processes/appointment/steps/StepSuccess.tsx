import { useUi } from "@/shared/libs";
import { useStepRequest } from "../context/StepRequest.context";
import { useRouter } from "next/navigation";
import { Box, Button, Text } from "@/shared/ui";
import { editRequestMutation } from "@/slices/appointments/features/request/edit/editRequest.hook";
import { format, startOfDay } from "date-fns";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Heading } from "@chakra-ui/react";
import { ptBR } from "date-fns/locale";
import { useTranslation } from "react-i18next";

export const StepSuccess = ({ title, content, setActiveStep }) => {
  const { t } = useTranslation(["PAGES"]);

  const { request } = useStepRequest() || {};
  const { showModal } = useUi();
  const router = useRouter();
  const editRequest = editRequestMutation({
    currentRequest: request?.requestCreated,
    showModal,
    router,
    routeRedirect: "/home",
    content: t("PAGES:NEW_APPOINTMENT.confirmMessage", {
      defaultValue:
        "Agendamento confirmado com sucesso, já pode ser visualizado na agenda.",
    }),
    t,
  });
  const confirmAppointment = async () => {
    await editRequest.mutateAsync({
      ...request?.requestToSend,
      date: startOfDay(request?.requestToSend?.initDate),
      status: 1,
    });
  };
  return (
    <Box textAlign="center" px={2} py={4}>
      <CheckCircleIcon boxSize="50px" color="tertiary.500" />
      {title && (
        <Heading color="gray.600" mt={4}>
          {title}
        </Heading>
      )}
      {content && <Text color="gray.600">{content}</Text>}
      {request?.requestCreated && (
        <>
          <Text mt={4} color="gray.600" fontSize={"2xl"}>
            {formatDate(request?.requestCreated?.initDate)}
          </Text>
          <Text mt={4} color="gray.600" fontSize={"2xl"}>
            {format(request?.requestCreated?.initDate, "HH:mm", {
              locale: ptBR,
            })}
            ....................
            {format(request?.requestCreated?.endDate, "HH:mm", {
              locale: ptBR,
            })}
          </Text>
          <Text mt={4} color="gray.600" fontWeight={"600"} fontSize={"2xl"}>
            {request?.name}
          </Text>
          <Text mt={4} color="gray.600" fontSize={"xl"}>
            {request?.currentService?.name} -{" "}
            {request?.currentService?.price?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}{" "}
            - {request?.currentService?.duration} min
          </Text>
          <Button
            mt={20}
            w={"100%"}
            colorScheme={"tertiary"}
            onClick={confirmAppointment}
          >
            {t("PAGES:NEW_APPOINTMENT.confirm", {
              defaultValue: "Confirmar agendamento",
            })}
          </Button>
          <Button
            w={"100%"}
            mt={16}
            colorScheme={"purple"}
            onClick={() => {
              setActiveStep(2);
            }}
          >
            {t("PAGES:NEW_APPOINTMENT.back", {
              defaultValue: "Voltar",
            })}
          </Button>
        </>
      )}
    </Box>
  );
};
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    weekday: "long",
  });
};

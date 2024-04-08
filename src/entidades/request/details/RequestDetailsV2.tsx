import { Box } from "@chakra-ui/react";
import { Button, DateDetails, Flex, ViewField } from "@/shared/ui";
import { statusMap } from "../request.model";
import { useRequestDetailsOwner } from "./useRequestDetailsOwner";
import { useRouter } from "next/navigation";

export const RequestDetailsV2 = ({ props: { request, onClose } }) => {
  const router = useRouter();
  const { serviceId, clientId } = request;
  const { service, client, deleteSelectedAction }: any = useRequestDetailsOwner({
    serviceId,
    clientId,
    currentRequest: request,
  });
  const duration = `${service?.duration ?? 0} min`;
  const onReschedule = () => {
    router.push(`/requests/edit/${request._id}`);
  };
  const onCancel = () => {
    deleteSelectedAction(request);
    onClose();
    router.push(`/requests/edit/${request._id}`);
  };
  return (
    <Box>
      <ViewField.Label>{statusMap?.[request?.status]}</ViewField.Label>
      <ViewField>
        <ViewField.Label>Cliente:</ViewField.Label>
        <ViewField.Description>{client?.name}</ViewField.Description>
      </ViewField>
      <ViewField>
        <ViewField.Label>Serviço:</ViewField.Label>
        <ViewField.Description>{service?.name}</ViewField.Description>
      </ViewField>
      <ViewField>
        <ViewField.Label>Duração:</ViewField.Label>
        <ViewField.Description>{duration}</ViewField.Description>
      </ViewField>
      <ViewField>
        <ViewField.Label>Preço:</ViewField.Label>
        <ViewField.PriceText>{service?.price}</ViewField.PriceText>
      </ViewField>
      <Box position="relative" float="right" mt={10}>
        {[0, 1, 7].includes(request?.status) && (
          <>
            <Button onClick={onCancel} colorScheme="red">
              Cancelar
            </Button>
            <Button colorScheme="primary" ml={6} onClick={onReschedule}>
              Reagendar
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

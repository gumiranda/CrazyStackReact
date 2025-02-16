import { Button, DateDetails, ViewField, Box } from "@/shared/ui";
import { statusMap } from "../request.model";
import { useRequestDetailsOwner } from "./useRequestDetailsOwner";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export const RequestDetailsV2 = ({ props: { request, onClose } }) => {
  const { t } = useTranslation(["PAGES"]);
  const router = useRouter();
  const { serviceId, clientId, initDate, endDate } = request;
  const { service, client, deleteSelectedAction, confirmSchedule }: any =
    useRequestDetailsOwner({
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
  const onConfirm = () => {
    confirmSchedule(request);
    onClose();
  };
  return (
    <Box bgColor="white">
      <ViewField.Label>
        {t(`PAGES:STATUS.${request?.status}`, {
          defaultValue: statusMap?.[request?.status],
        })}
      </ViewField.Label>
      <DateDetails initDate={initDate} endDate={endDate} />
      <ViewField>
        <ViewField.Label>
          {t("PAGES:HOME_PAGE.client", {
            defaultValue: "Cliente",
          })}
          :
        </ViewField.Label>
        <ViewField.Description>{client?.name}</ViewField.Description>
      </ViewField>
      <ViewField>
        <ViewField.Label>
          {t("PAGES:HOME_PAGE.service", {
            defaultValue: "Serviço",
          })}
          :
        </ViewField.Label>
        <ViewField.Description>{service?.name}</ViewField.Description>
      </ViewField>
      <ViewField>
        <ViewField.Label>
          {t("PAGES:FIELDS.duration", {
            defaultValue: "Duração",
          })}
          :
        </ViewField.Label>
        <ViewField.Description>{duration}</ViewField.Description>
      </ViewField>
      <ViewField>
        <ViewField.Label>
          {t("PAGES:FIELDS.price", {
            defaultValue: "Preço",
          })}
          :
        </ViewField.Label>
        <ViewField.PriceText>{service?.price}</ViewField.PriceText>
      </ViewField>
      <Box position="relative" float="right" mt={10}>
        {[0, 1, 4, 6, 7].includes(request?.status) && (
          <>
            <Button onClick={onCancel} colorPalette="red">
              {t("PAGES:MESSAGES.cancel", {
                defaultValue: "Cancelar",
              })}
            </Button>
            <Button colorPalette="purple" ml={6} onClick={onReschedule}>
              {t("PAGES:FIELDS.reschedule", {
                defaultValue: "Reagendar",
              })}
            </Button>
            {[0, 6].includes(request?.status) && (
              <Button colorPalette="green" ml={6} onClick={onConfirm}>
                {t("PAGES:FIELDS.confirm", {
                  defaultValue: "Confirmar",
                })}
              </Button>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

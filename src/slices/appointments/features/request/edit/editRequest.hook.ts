/* eslint-disable react-hooks/rules-of-hooks */
import { useUi } from "@/shared/libs";
import { EditRequestFormProps } from "./EditRequestForm";
import {
  EditRequestFormData,
  SubmitEditRequestHandler,
  useEditRequestLib,
} from "./editRequest.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTimeAvailable } from "@/slices/appointments/features/appointment/timeAvailable.hook";
import { addMinutes } from "date-fns";
import { RequestProps } from "@/slices/appointments/entidades/request";
import { useTranslation } from "react-i18next";

export const useEditRequest = (props: EditRequestFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const router = useRouter();
  const { showModal } = useUi();
  const { request: currentRequest, owners } = props;
  const [dateChanged, setDateChanged] = useState(false);
  const [dateSelected, setDateSelected] = useState(currentRequest?.datePickerSelected);
  const { timeAvailable, timeSelected, handleChangeTimeSelected } = useTimeAvailable({
    ownerId: currentRequest?.createdForId,
    professionalId: currentRequest?.professionalId,
    serviceId: currentRequest?.serviceId,
    date: dateSelected ?? null,
  });
  const [statusSelected, setStatusSelected] = useState<number>(currentRequest?.status);
  const handleChangeStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusSelected(event.target.value as number);
  };
  const editRequest = editRequestMutation({
    currentRequest,
    showModal,
    router,
    t,
    routeRedirect: "/requests/1",
    content: t("PAGES:MESSAGES.successMessage", {
      domain: t("PAGES:HOME_PAGE.request", {
        defaultValue: "Solicitação",
      }),
      operation: t("PAGES:MESSAGES.edit", {
        defaultValue: "editada",
      }),
      defaultValue:
        "Solicitação editada com sucesso, você será redirecionado para a lista de solicitações",
    }),
  });
  const { register, handleSubmit, formState } = useEditRequestLib(props);
  const {
    professionalId,
    date,
    ownerId,
    serviceId,
    clientId,
    initDate,
    endDate,
    duration = 60,
  } = currentRequest || {};
  const handleEditRequest: SubmitEditRequestHandler = async (
    values: EditRequestFormData
  ) => {
    await editRequest.mutateAsync({
      ...values,
      date,
      professionalId,
      ownerId,
      serviceId,
      status: statusSelected,
      clientId,
      initDate: dateChanged
        ? timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value
        : initDate,
      endDate: dateChanged
        ? addMinutes(
            new Date(timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value ?? null),
            duration
          ).toISOString()
        : endDate,
    });
  };
  return {
    formState,
    register,
    handleSubmit,
    handleEditRequest,
    statusSelected,
    handleChangeStatus,
    dateSelected,
    setDateSelected,
    timeAvailable,
    timeSelected,
    handleChangeTimeSelected,
    dateChanged,
    setDateChanged,
  };
};

export function editRequestMutation({
  currentRequest,
  showModal,
  router,
  content,
  routeRedirect,
  t,
}: {
  currentRequest: RequestProps;
  showModal: Function;
  router: any;
  content: string;
  routeRedirect: string;
  t: any;
}) {
  return useMutation({
    mutationFn: async (request: EditRequestFormData) => {
      try {
        const { data } = await api.patch(`/request/update?_id=${currentRequest._id}`, {
          ...request,
          updatedAt: new Date(),
        });
        if (!data) {
          showModal({
            content: t("PAGES:MESSAGES.errorMessage", {
              defaultValue:
                "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
            }),
            title: t("PAGES:MESSAGES.internalServerError", {
              defaultValue: "Erro no servidor",
            }),
            type: "error",
          });
          return;
        }
        showModal({
          content,
          title: t("PAGES:MESSAGES.success", {
            defaultValue: "Sucesso",
          }),
          type: "success",
        });
        if (router) {
          router.push(routeRedirect ?? "/requests/edit/" + currentRequest?._id);
        }
        return data;
      } catch (error) {
        ({
          content: t("PAGES:MESSAGES.errorMessage", {
            defaultValue:
              "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          }),
          title: t("PAGES:MESSAGES.internalServerError", {
            defaultValue: "Erro no servidor",
          }),
          type: "error",
        });
      }
    },
  });
}

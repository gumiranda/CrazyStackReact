import { useUi } from "shared/libs";
import { EditRequestFormProps } from "./EditRequestForm";
import {
  EditRequestFormData,
  SubmitEditRequestHandler,
  useEditRequestLib,
} from "./editRequest.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTimeAvailable } from "features/appointment/timeAvailable.hook";
import { addMinutes } from "date-fns";

export const useEditRequest = (props: EditRequestFormProps) => {
  const router = useRouter();
  const { showModal } = useUi();
  const { request: currentRequest } = props;
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
  const editRequest = useMutation(async (request: EditRequestFormData) => {
    try {
      const { data } = await api.patch(`/request/update?_id=${currentRequest._id}`, {
        ...request,
        updatedAt: new Date(),
      });
      if (!data) {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
        return;
      }
      showModal({
        content:
          "Solicitação editada com sucesso, você será redirecionado para a lista de solicitações",
        title: "Sucesso",
        type: "success",
      });
      router.push("/requests/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
  const { register, handleSubmit, formState } = useEditRequestLib(props);
  const handleEditRequest: SubmitEditRequestHandler = async (
    values: EditRequestFormData
  ) => {
    await editRequest.mutateAsync({
      ...values,
      date: currentRequest?.date,
      professionalId: currentRequest?.professionalId,
      ownerId: currentRequest?.createdForId,
      serviceId: currentRequest?.serviceId,
      clientId: currentRequest?.clientId,
      status: statusSelected,
      initDate:
        timeSelected ??
        timeAvailable?.timeAvailable?.[0]?.value ??
        currentRequest?.initDate,
      endDate:
        timeSelected || timeAvailable?.timeAvailable?.[0]?.value
          ? addMinutes(
              new Date(timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value ?? null),
              currentRequest?.duration ?? 60
            )?.toISOString?.()
          : currentRequest?.endDate,
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

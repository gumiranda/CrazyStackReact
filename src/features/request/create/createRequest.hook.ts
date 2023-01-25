import { useUi } from "shared/libs";
import {
  CreateRequestFormData,
  SubmitCreateRequestHandler,
  useCreateRequestLib,
} from "./createRequest.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useOwnersSelect } from "features/owner/ownerList.hook";
import { GetOwnersResponse } from "entidades/owner";
import { useUsersSelect } from "features/user/userList.hook";
import { useServicesSelect } from "features/service/serviceList.hook";
import { useClientsSelect } from "features/client/clientList.hook";
import { useTimeAvailable } from "features/appointment/timeAvailable.hook";
import { addMinutes } from "date-fns";
type CreateRequestFormProps = {
  ownerList: GetOwnersResponse;
};
export const useCreateRequest = ({ ownerList }: CreateRequestFormProps) => {
  const { showModal } = useUi();
  const router = useRouter();
  const [dateSelected, setDateSelected] = useState(null);
  const { ownerSelected, handleChangeOwnerSelected, owners } = useOwnersSelect({
    ownerList,
  });
  const { userSelected, handleChangeUserSelected, users } = useUsersSelect({
    ownerSelected,
  });
  const { serviceSelected, handleChangeServiceSelected, services } = useServicesSelect({
    ownerSelected: owners?.find?.((owner) => owner?._id === ownerSelected)?.createdById,
    userSelected,
    users,
  });
  const { clientSelected, handleChangeClientSelected, clients } = useClientsSelect({
    ownerSelected: owners?.find?.((owner) => owner?._id === ownerSelected)?.createdById,
  });
  const { timeAvailable, timeSelected, handleChangeTimeSelected } = useTimeAvailable({
    ownerId: owners?.find?.((owner) => ownerSelected === owner?._id)?.createdById ?? "",
    professionalId: userSelected,
    serviceId: serviceSelected,
    date: dateSelected ?? null,
  });
  const [active, setActive] = useState(false);
  const createRequest = useMutation(async (request: CreateRequestFormData) => {
    try {
      const { data } = await api.post("/request/add", {
        ...request,
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
          "Solicitação criada com sucesso, você será redirecionado para a lista de solicitações",
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
  const serviceDuration =
    services?.find?.((service) => service?._id === serviceSelected)?.duration ?? 60;
  const requestObjectIds = {
    haveDelivery: false,
    haveRecurrence: false,
    haveFidelity: false,
    haveRide: false,
    type: "service",
    status: 0,
    serviceId: serviceSelected,
    clientId: clientSelected,
    professionalId: userSelected,
    ownerId: ownerSelected,
    createdForId: owners?.find?.((owner) => owner?._id === ownerSelected)?.createdById,
    clientUserId: clients?.find?.((client) => client?._id === clientSelected)?.userId,
    initDate: timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value,
    endDate: addMinutes(
      new Date(timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value ?? null),
      serviceDuration
    )?.toISOString(),
    duration: serviceDuration,
  };
  const { register, handleSubmit, formState } = useCreateRequestLib(requestObjectIds);
  const handleCreateRequest: SubmitCreateRequestHandler = async (
    values: CreateRequestFormData
  ) => {
    await createRequest.mutateAsync({ ...values, active, ...requestObjectIds });
  };
  return {
    formState,
    register,
    handleSubmit,
    handleCreateRequest,
    active,
    setActive,
    handleChangeOwnerSelected,
    owners,
    ownerSelected,
    userSelected,
    handleChangeUserSelected,
    users,
    serviceSelected,
    handleChangeServiceSelected,
    services: services.filter((service) =>
      users
        ?.find?.((user) => user?._id === userSelected)
        ?.serviceIds?.includes?.(service?._id)
    ),
    setDateSelected,
    timeAvailable,
    timeSelected,
    handleChangeTimeSelected,
    clientSelected,
    handleChangeClientSelected,
    clients,
  };
};

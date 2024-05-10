/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useUi } from "@/shared/libs";
import {
  CreateRequestFormData,
  SubmitCreateRequestHandler,
  useCreateRequestLib,
} from "./createRequest.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useOwnersSelect } from "@/slices/appointments/features/owner/ownerList.hook";
import { GetOwnersResponse } from "@/slices/appointments/entidades/owner";
import { useUsersSelect } from "@/slices/general/features/user/userList.hook";
import { useServicesSelect } from "@/slices/appointments/features/service/serviceList.hook";
import { useClientsSelect } from "@/slices/appointments/features/client/clientList.hook";
import { useTimeAvailable } from "@/slices/appointments/features/appointment/timeAvailable.hook";
import { addMinutes } from "date-fns";
import { useTranslation } from "react-i18next";

type CreateRequestFormProps = {
  ownerList: GetOwnersResponse;
};
export const useCreateRequest = ({ ownerList }: CreateRequestFormProps) => {
  const { t } = useTranslation(["PAGES"]);
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
  const createRequest = createRequestMutation(showModal, router, t);
  const currentService = services?.find?.((service) => service?._id === serviceSelected);
  const serviceDuration = currentService?.duration ?? 60;
  const currentOwner = owners?.find?.((owner) => owner?._id === ownerSelected);
  const currentClient = clients?.find?.((client) => client?._id === clientSelected);
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
    createdForId: currentOwner?.createdById,
    clientUserId: currentClient?.userId,
    initDate: timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value,
    endDate: addMinutes(
      new Date(timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value ?? null),
      serviceDuration
    )?.toISOString(),
    duration: serviceDuration,
    serviceName: currentService?.name,
    ownerName: currentOwner?.name,
    clientName: currentClient?.name,
    professionalName: users?.find?.((user) => user?._id === userSelected)?.name,
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

export function createRequestMutation(showModal: Function, router, t) {
  return useMutation({
    mutationFn: async (request: CreateRequestFormData) => {
      try {
        const { data } = await api.post("/request/add", {
          ...request,
          message: request?.message + " " ?? " ",
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
          content: t("PAGES:MESSAGES.successMessage", {
            domain: t("PAGES:HOME_PAGE.request", {
              defaultValue: "Solicitação",
            }),
            operation: t("PAGES:MESSAGES.create", {
              defaultValue: "criada",
            }),
            defaultValue:
              "Solicitação criada com sucesso, você será redirecionado para a lista de solicitações",
          }),
          title: t("PAGES:MESSAGES.success", {
            defaultValue: "Sucesso",
          }),
          type: "success",
        });
        if (router) {
          router.push("/requests/edit/" + data?._id);
        }
        return data;
      } catch (error) {
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
      }
    },
  });
}

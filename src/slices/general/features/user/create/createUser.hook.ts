import { useServiceListMultiple } from "./../serviceListMultiple";
import { useOwnersSelect } from "@/slices/appointments/features/owner/ownerList.hook";
import { useUi } from "@/shared/libs";
import {
  CreateUserFormData,
  SubmitCreateUserHandler,
  useCreateUserLib,
} from "./createUser.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { GetServicesResponse } from "@/slices/appointments/entidades/service";
import { GetOwnersResponse, OwnerProps } from "@/slices/appointments/entidades/owner";
import { useTranslation } from "react-i18next";

type CreateUserFormProps = {
  serviceList: GetServicesResponse;
  ownerList: GetOwnersResponse;
};
export const useCreateUser = ({ serviceList, ownerList }: CreateUserFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const { showModal } = useUi();
  const router = useRouter();
  const [serviceIds, setServiceIds] = useState<string[] | undefined>([]);
  const { serviceOptions } = useServiceListMultiple({ serviceList });
  const { ownerSelected, handleChangeOwnerSelected, owners } = useOwnersSelect({
    ownerList,
  });
  const [active, setActive] = useState(false);
  const createUser = useMutation({
    mutationFn: async (user: CreateUserFormData) => {
      try {
        const { data } = await api.post("/user/add", user);
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
            domain: t("PAGES:HOME_PAGE.professional", {
              defaultValue: "Profissional",
            }),
            operation: t("PAGES:MESSAGES.create", {
              defaultValue: "criado",
            }),
            defaultValue:
              "Profissional editado com sucesso, você será redirecionado para a lista de profissionais",
          }),
          title: t("PAGES:MESSAGES.success", {
            defaultValue: "Sucesso",
          }),
          type: "success",
        });
        router.push("/users/1");
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
  const { register, handleSubmit, formState, control } = useCreateUserLib();
  const handleCreateUser: SubmitCreateUserHandler = async (
    values: CreateUserFormData
  ) => {
    await createUser.mutateAsync({
      ...values,
      active,
      serviceIds, //values?.serviceOptions?.map?.((service) => service?.value),
      ownerId: ownerSelected,
      myOwnerId: owners?.find?.((owner: OwnerProps) => owner?._id === ownerSelected)?._id,
      role: "professional",
    });
  };
  return {
    formState,
    register,
    handleSubmit,
    handleCreateUser,
    active,
    setActive,
    control,
    serviceOptions,
    handleChangeOwnerSelected,
    owners,
    ownerSelected,
    serviceIds,
    setServiceIds,
  };
};

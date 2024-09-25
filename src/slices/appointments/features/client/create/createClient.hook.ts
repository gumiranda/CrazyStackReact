/* eslint-disable react-hooks/rules-of-hooks */
import { useUi } from "@/shared/libs";
import {
  CreateClientFormData,
  SubmitCreateClientHandler,
  useCreateClientLib,
} from "./createClient.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ClientCreateFormProps } from "./CreateClientForm";
import { useUsersSelect } from "@/slices/general/features/user/userList.hook";
import { useTranslation } from "react-i18next";

export const useCreateClient = ({ userList, owners }: ClientCreateFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const { userSelected, handleChangeUserSelected, users } = useUsersSelect({
    role: "client",
    userList,
  });
  const createClient = createClientMutation(showModal, router, t);
  const { register, handleSubmit, formState } = useCreateClientLib();
  const handleCreateClient: SubmitCreateClientHandler = async (
    values: CreateClientFormData
  ) => {
    await createClient.mutateAsync({
      ...values,
      active,
      userId: userSelected ?? users?.[0]?._id,
      myOwnerId: owners?.[0]?.createdById,
      ownerId: owners?.[0]?._id,
    });
  };
  return {
    formState,
    register,
    handleSubmit,
    handleCreateClient,
    active,
    setActive,
    userSelected,
    handleChangeUserSelected,
    users,
  };
};

export function createClientMutation(showModal: Function, router, t) {
  return useMutation({
    mutationFn: async (client: CreateClientFormData) => {
      try {
        const { data } = await api.post("/client/add", {
          ...client,
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
            domain: t("PAGES:HOME_PAGE.client", {
              defaultValue: "Cliente",
            }),
            operation: t("PAGES:MESSAGES.create", {
              defaultValue: "criado",
            }),
            defaultValue:
              "Cliente criado com sucesso, você será redirecionado para a lista de clientes",
          }),
          title: t("PAGES:MESSAGES.success", {
            defaultValue: "Sucesso",
          }),
          type: "success",
        });
        if (router) {
          router.push("/clients/1");
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

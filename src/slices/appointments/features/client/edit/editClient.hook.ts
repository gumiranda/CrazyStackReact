"use client";

import { useUi } from "@/shared/libs";
import { EditClientFormProps } from "./EditClientForm";
import {
  EditClientFormData,
  SubmitEditClientHandler,
  useEditClientLib,
} from "./editClient.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useEditClient = (props: EditClientFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const { showModal } = useUi();
  const { client: currentClient, id, users } = props;
  const router = useRouter();
  const editClient = useMutation({
    mutationFn: async (client: EditClientFormData) => {
      try {
        const { data } = await api.patch(
          `/client/update?_id=${currentClient?._id ?? id}`,
          {
            ...client,
            updatedAt: new Date(),
          }
        );
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
            operation: t("PAGES:MESSAGES.edit", {
              defaultValue: "editado",
            }),
            defaultValue:
              "Cliente editado com sucesso, você será redirecionado para a lista de clientes",
          }),
          title: t("PAGES:MESSAGES.success", {
            defaultValue: "Sucesso",
          }),
          type: "success",
        });
        router.push("/clients/1");
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
  const { register, handleSubmit, formState } = useEditClientLib(props);
  const handleEditClient: SubmitEditClientHandler = async (
    values: EditClientFormData
  ) => {
    await editClient.mutateAsync(values);
  };
  return { formState, register, handleSubmit, handleEditClient };
};

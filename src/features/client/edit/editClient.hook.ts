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
export const useEditClient = (props: EditClientFormProps) => {
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
            content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
            title: "Erro no servidor",
            type: "error",
          });
          return;
        }
        showModal({
          content:
            "Cliente editada com sucesso, você será redirecionado para a lista de clientes",
          title: "Sucesso",
          type: "success",
        });
        router.push("/clients/1");
        return data;
      } catch (error) {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
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

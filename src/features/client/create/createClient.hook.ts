import { useUi } from "shared/libs";
import {
  CreateClientFormData,
  SubmitCreateClientHandler,
  useCreateClientLib,
} from "./createClient.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
export const useCreateClient = () => {
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const createClient = useMutation(async (client: CreateClientFormData) => {
    try {
      const { data } = await api.post("/client/add", {
        ...client,
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
          "Cliente criada com sucesso, você será redirecionado para a lista de clientes",
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
  }, {});
  const { register, handleSubmit, formState } = useCreateClientLib();
  const handleCreateClient: SubmitCreateClientHandler = async (
    values: CreateClientFormData
  ) => {
    await createClient.mutateAsync({ ...values, active });
  };
  return { formState, register, handleSubmit, handleCreateClient, active, setActive };
};

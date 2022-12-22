import { useUi } from "shared/libs";
import {
  CreateServiceFormData,
  SubmitCreateServiceHandler,
  useCreateServiceLib,
} from "./createService.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
export const useCreateService = () => {
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const createService = useMutation(async (service: CreateServiceFormData) => {
    try {
      const { data } = await api.post("/service/add", {
        ...service,
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
          "Serviço criada com sucesso, você será redirecionado para a lista de serviços",
        title: "Sucesso",
        type: "success",
      });
      router.push("/services/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
  const { register, handleSubmit, formState } = useCreateServiceLib();
  const handleCreateService: SubmitCreateServiceHandler = async (
    values: CreateServiceFormData
  ) => {
    await createService.mutateAsync({ ...values, active });
  };
  return { formState, register, handleSubmit, handleCreateService, active, setActive };
};

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
export const useCreateRequest = () => {
  const { showModal } = useUi();
  const router = useRouter();
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
  const { register, handleSubmit, formState } = useCreateRequestLib();
  const handleCreateRequest: SubmitCreateRequestHandler = async (
    values: CreateRequestFormData
  ) => {
    await createRequest.mutateAsync({ ...values, active });
  };
  return { formState, register, handleSubmit, handleCreateRequest, active, setActive };
};

import { useUi } from "shared/libs";
import {
  CreateOwnerFormData,
  SubmitCreateOwnerHandler,
  useCreateOwnerLib,
} from "./createOwner.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
export const useCreateOwner = () => {
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const createOwner = useMutation(async (owner: CreateOwnerFormData) => {
    try {
      const { data } = await api.post("/owner/add", {
        ...owner,
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
          "Estabelecimento criada com sucesso, você será redirecionado para a lista de estabelecimentos",
        title: "Sucesso",
        type: "success",
      });
      router.push("/owners/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
  const { register, handleSubmit, formState } = useCreateOwnerLib();
  const handleCreateOwner: SubmitCreateOwnerHandler = async (
    values: CreateOwnerFormData
  ) => {
    await createOwner.mutateAsync({ ...values, active });
  };
  return { formState, register, handleSubmit, handleCreateOwner, active, setActive };
};

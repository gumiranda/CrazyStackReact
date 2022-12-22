import { useUi } from "shared/libs";
import {
  CreateCategoryFormData,
  SubmitCreateCategoryHandler,
  useCreateCategoryLib,
} from "./createCategory.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
export const useCreateCategory = () => {
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const createCategory = useMutation(async (category: CreateCategoryFormData) => {
    try {
      const { data } = await api.post("/category/add", {
        ...category,
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
          "Categoria criada com sucesso, você será redirecionado para a lista de categorias",
        title: "Sucesso",
        type: "success",
      });
      router.push("/categorys/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
  const { register, handleSubmit, formState } = useCreateCategoryLib();
  const handleCreateCategory: SubmitCreateCategoryHandler = async (
    values: CreateCategoryFormData
  ) => {
    await createCategory.mutateAsync({ ...values, active });
  };
  return { formState, register, handleSubmit, handleCreateCategory, active, setActive };
};

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
import { CreateServiceFormProps } from "./CreateServiceForm";
import { useCategoriesSelect } from "features/category/categoryList.hook";

export const useCreateService = ({ categoryList }: CreateServiceFormProps) => {
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const {
    categorySelected,
    setCategorySelected,
    handleChangeCategorySelected,
    categorys,
  } = useCategoriesSelect({ categoryList });
  const [havePromotionalPrice, setHavePromotionalPrice] = useState(false);
  const [hasFidelityGenerator, setHasFidelityGenerator] = useState(false);
  const [canPayWithFidelityPoints, setCanPayWithFidelityPoints] = useState(false);
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
    if (categorySelected === "loadMore") {
      showModal({
        content: "Escolha uma categoria válida para prosseguir",
        title: "Categoria inválida",
        type: "error",
      });
      return;
    }
    await createService.mutateAsync({
      ...values,
      active,
      categoryId: categorySelected,
      havePromotionalPrice,
      hasFidelityGenerator,
      canPayWithFidelityPoints,
      appointmentsTotal: 0,
    });
  };
  return {
    categorySelected,
    setCategorySelected,
    formState,
    register,
    handleSubmit,
    handleCreateService,
    active,
    setActive,
    handleChangeCategorySelected,
    categorys,
    havePromotionalPrice,
    hasFidelityGenerator,
    canPayWithFidelityPoints,
    setHavePromotionalPrice,
    setHasFidelityGenerator,
    setCanPayWithFidelityPoints,
  };
};

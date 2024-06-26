"use client";
import { useUi } from "@/shared/libs";
import { EditServiceFormProps } from "./EditServiceForm";
import {
  EditServiceFormData,
  SubmitEditServiceHandler,
  useEditServiceLib,
} from "./editService.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useCategoriesSelect } from "@/features/category/categoryList.hook";
import { useState } from "react";
export const useEditService = (props: EditServiceFormProps) => {
  const { showModal } = useUi();
  const { service: currentService, categoryList } = props;
  const router = useRouter();
  const { categorySelected, handleChangeCategorySelected, categorys } =
    useCategoriesSelect({ categoryList, currentService });
  const [active, setActive] = useState(false);
  const [havePromotionalPrice, setHavePromotionalPrice] = useState(false);
  const [hasFidelityGenerator, setHasFidelityGenerator] = useState(false);
  const [canPayWithFidelityPoints, setCanPayWithFidelityPoints] = useState(false);
  const editService = useMutation({
    mutationFn: async (service: EditServiceFormData) => {
      try {
        const { data } = await api.patch(`/service/update?_id=${currentService._id}`, {
          ...service,
          updatedAt: new Date(),
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
            "Serviço editado com sucesso, você será redirecionado para a lista de serviços",
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
    },
  });
  const { register, handleSubmit, formState } = useEditServiceLib(props);
  const handleEditService: SubmitEditServiceHandler = async (
    values: EditServiceFormData
  ) => {
    await editService.mutateAsync({
      ...values,
      categoryId: categorySelected,
      havePromotionalPrice,
      hasFidelityGenerator,
      canPayWithFidelityPoints,
    });
  };
  return {
    formState,
    register,
    handleSubmit,
    handleEditService,
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
    categorySelected,
  };
};

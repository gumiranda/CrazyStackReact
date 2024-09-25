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
import { useCategoriesSelect } from "@/slices/appointments/features/category/categoryList.hook";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useEditService = (props: EditServiceFormProps) => {
  const { t } = useTranslation(["PAGES"]);
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
            domain: t("PAGES:HOME_PAGE.service", {
              defaultValue: "Serviço",
            }),
            operation: t("PAGES:MESSAGES.edit", {
              defaultValue: "editado",
            }),
            defaultValue:
              "Serviço editado com sucesso, você será redirecionado para a lista de serviços",
          }),
          title: t("PAGES:MESSAGES.success", {
            defaultValue: "Sucesso",
          }),
          type: "success",
        });
        router.push("/services/1");
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

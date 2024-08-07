"use client";
import { useUi } from "@/shared/libs";
import { EditCategoryFormProps } from "./EditCategoryForm";
import {
  EditCategoryFormData,
  SubmitEditCategoryHandler,
  useEditCategoryLib,
} from "./editCategory.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useEditCategory = (props: EditCategoryFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const { showModal } = useUi();
  const { category: currentCategory } = props;
  const router = useRouter();
  const editCategory = useMutation({
    mutationFn: async (category: EditCategoryFormData) => {
      try {
        const { data } = await api.patch(`/category/update?_id=${currentCategory._id}`, {
          ...category,
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
            domain: t("PAGES:HOME_PAGE.category", {
              defaultValue: "Categoria",
            }),
            operation: t("PAGES:MESSAGES.edit", {
              defaultValue: "editada",
            }),
            defaultValue:
              "Categoria editada com sucesso, você será redirecionado para a lista de categorias",
          }),
          title: t("PAGES:MESSAGES.success", {
            defaultValue: "Sucesso",
          }),
          type: "success",
        });
        router.push("/categorys/1");
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
  const { register, handleSubmit, formState } = useEditCategoryLib(props);
  const handleEditCategory: SubmitEditCategoryHandler = async (
    values: EditCategoryFormData
  ) => {
    await editCategory.mutateAsync(values);
  };
  return { formState, register, handleSubmit, handleEditCategory };
};

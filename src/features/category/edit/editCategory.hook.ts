import { useUi } from "shared/libs";
import { EditCategoryFormProps } from "./EditCategoryForm";
import {
  EditCategoryFormData,
  SubmitEditCategoryHandler,
  useEditCategoryLib,
} from "./editCategory.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
export const useEditCategory = (props: EditCategoryFormProps) => {
  const { showModal } = useUi();
  const { category: currentCategory } = props;
  const router = useRouter();
  const editCategory = useMutation(async (category: EditCategoryFormData) => {
    try {
      const { data } = await api.patch(`/category/update?_id=${currentCategory._id}`, {
        ...category,
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
          "Categoria editada com sucesso, você será redirecionado para a lista de categorias",
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
  const { register, handleSubmit, formState } = useEditCategoryLib(props);
  const handleEditCategory: SubmitEditCategoryHandler = async (
    values: EditCategoryFormData
  ) => {
    await editCategory.mutateAsync(values);
  };
  return { formState, register, handleSubmit, handleEditCategory };
};

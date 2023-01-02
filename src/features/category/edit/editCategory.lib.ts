import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditCategoryFormProps } from "./EditCategoryForm";
export type EditCategoryFormData = {
  name: string;
};

export type SubmitEditCategoryHandler = SubmitHandler<EditCategoryFormData>;

export const editCategoryFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useEditCategoryLib = (props: EditCategoryFormProps) => {
  const { category: currentCategory } = props;
  const formProps = useForm<EditCategoryFormData>({
    resolver: yupResolver(editCategoryFormSchema),
    defaultValues: {
      name: currentCategory?.name ?? "",
    },
  });
  return { ...formProps };
};

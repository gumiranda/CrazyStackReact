import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditCategoryFormProps } from "./EditCategoryForm";
export type EditCategoryFormData = {
  name: string;
};

export type SubmitEditCategoryHandler = SubmitHandler<EditCategoryFormData>;

export const editCategoryFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
});
export type YupSchema = yup.InferType<typeof editCategoryFormSchema>;

export const useEditCategoryLib = (props: EditCategoryFormProps) => {
  const { category: currentCategory } = props;
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(editCategoryFormSchema),
    defaultValues: {
      name: currentCategory?.name ?? "",
    },
  });
  return { ...formProps };
};

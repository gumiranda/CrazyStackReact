import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateCategoryFormData = {
  name: string;
  active?: boolean;
};

export type SubmitCreateCategoryHandler = SubmitHandler<CreateCategoryFormData>;

export const createCategoryFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
});
export type YupSchema = yup.InferType<typeof createCategoryFormSchema>;

export const useCreateCategoryLib = () => {
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(createCategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });
  return { ...formProps };
};

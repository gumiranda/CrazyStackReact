import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditClientFormProps } from "./EditClientForm";
export type EditClientFormData = {
  name: string;
};

export type SubmitEditClientHandler = SubmitHandler<EditClientFormData>;

export const editClientFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
});
export type YupSchema = yup.InferType<typeof editClientFormSchema>;

export const useEditClientLib = (props: EditClientFormProps) => {
  const { client: currentClient } = props;
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(editClientFormSchema),
    defaultValues: {
      name: currentClient?.name ?? "",
    },
  });
  return { ...formProps };
};

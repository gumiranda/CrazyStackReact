import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditClientFormProps } from "./EditClientForm";
export type EditClientFormData = {
  name: string;
};

export type SubmitEditClientHandler = SubmitHandler<EditClientFormData>;

export const editClientFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useEditClientLib = (props: EditClientFormProps) => {
  const { client: currentClient } = props;
  const formProps = useForm<EditClientFormData>({
    resolver: yupResolver(editClientFormSchema),
    defaultValues: {
      name: currentClient?.name ?? "",
    },
  });
  return { ...formProps };
};

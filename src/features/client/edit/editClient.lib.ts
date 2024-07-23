import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditClientFormProps } from "./EditClientForm";
export type EditClientFormData = {
  name: string;
  phone: string;
  _id?: string;
};

export type SubmitEditClientHandler = SubmitHandler<EditClientFormData>;

export const editClientFormSchema = yup.object({
  _id: yup.string(),
  name: yup.string().required("Nome é obrigatório"),
  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .test("phone", "Telefone inválido", (value) => {
      const cleanedPhone = value?.replace?.(/\D/g, "");
      return cleanedPhone?.length === 11;
    }),
});
export type YupSchema = yup.InferType<typeof editClientFormSchema>;

export const useEditClientLib = (props: EditClientFormProps) => {
  const { client: currentClient } = props;
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(editClientFormSchema),
    defaultValues: {
      name: currentClient?.name ?? "",
      phone: currentClient?.phone ?? "",
      _id: currentClient?._id ?? "",
    },
  });
  return { ...formProps };
};

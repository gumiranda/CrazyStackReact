import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditServiceFormProps } from "./EditServiceForm";
export type EditServiceFormData = {
  name: string;
};

export type SubmitEditServiceHandler = SubmitHandler<EditServiceFormData>;

export const editServiceFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useEditServiceLib = (props: EditServiceFormProps) => {
  const { service: currentService } = props;
  const formProps = useForm<EditServiceFormData>({
    resolver: yupResolver(editServiceFormSchema),
    defaultValues: {
      name: currentService?.name ?? "",
    },
  });
  return { ...formProps };
};

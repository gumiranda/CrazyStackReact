import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateOwnerFormData = {
  name: string;
  description: string;
  minimumTimeForReSchedule?: number;
  active?: boolean;
  haveDelivery?: boolean;
};

export type SubmitCreateOwnerHandler = SubmitHandler<CreateOwnerFormData>;

export const createOwnerFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  minimumTimeForReSchedule: yup.number().min(30).required("Descrição é obrigatória"),
});

export const useCreateOwnerLib = () => {
  const formProps = useForm<CreateOwnerFormData>({
    resolver: yupResolver(createOwnerFormSchema),
    defaultValues: {
      name: "",
      description: "",
      minimumTimeForReSchedule: 30,
    },
  });
  return { ...formProps };
};

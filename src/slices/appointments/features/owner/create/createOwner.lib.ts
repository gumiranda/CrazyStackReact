import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateOwnerFormData } from "@/slices/appointments/entidades/owner";

export type SubmitCreateOwnerHandler = SubmitHandler<CreateOwnerFormData>;

export const createOwnerFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  minimumTimeForReSchedule: yup
    .number()
    .min(30)
    .required("Tempo mínimo para reagendar é obrigatório"),
});
export type YupSchema = yup.InferType<typeof createOwnerFormSchema>;

export const useCreateOwnerLib = () => {
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(createOwnerFormSchema),
    defaultValues: {
      name: "",
      description: "",
      minimumTimeForReSchedule: 30,
    },
  });
  return { ...formProps };
};

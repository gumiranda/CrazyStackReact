import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditOwnerFormProps } from "./EditOwnerForm";
import { EditOwnerFormData, formatOptions } from "@/slices/appointments/entidades/owner";

export type SubmitEditOwnerHandler = SubmitHandler<EditOwnerFormData>;

export const editOwnerFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  days1Options: yup
    .array()
    .required("É necessário selecionar pelo menos um dia da semana")
    .min(1, "É necessário selecionar pelo menos um dia da semana")
    .of(
      yup.object({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    ),
  days2Options: yup.array(),
  days3Options: yup.array(),
  minimumTimeForReSchedule: yup.number().min(30).required("tempo mínimo é obrigatório"),
});
export type YupSchema = yup.InferType<typeof editOwnerFormSchema>;

export const useEditOwnerLib = (props: EditOwnerFormProps) => {
  const { owner: currentOwner } = props;
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(editOwnerFormSchema),
    defaultValues: {
      name: currentOwner?.name ?? "",
      description: currentOwner?.description ?? "",
      minimumTimeForReSchedule: currentOwner?.minimumTimeForReSchedule ?? 30,
      days1Options: formatOptions(currentOwner?.days1) ?? [],
      days2Options: formatOptions(currentOwner?.days2) ?? [],
      days3Options: formatOptions(currentOwner?.days3) ?? [],
    },
  });
  return { ...formProps };
};

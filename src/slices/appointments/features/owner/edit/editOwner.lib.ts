import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditOwnerFormProps } from "./EditOwnerForm";
import { EditOwnerFormData } from "@/slices/appointments/entidades/owner";

export type SubmitEditOwnerHandler = SubmitHandler<EditOwnerFormData>;

export const editOwnerFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  minimumTimeForReSchedule: yup.number().min(30).required("tempo mínimo é obrigatório"),
  address: yup.string().required("Endereço é obrigatório"),
  phone: yup.string().test("phone", "Telefone inválido", (value) => {
    if (!value) return false;
    const cleanedPhone = value?.replace?.(/\D/g, "");
    return cleanedPhone?.length === 11;
  }),
  coord: yup.object({
    lat: yup.number().nullable(),
    lng: yup.number().nullable(),
  }),
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
      address: currentOwner?.place?.address ?? "",
      phone: currentOwner?.place?.phone ?? "",
      coord: {
        lat: currentOwner?.place?.coord?.coordinates?.[0],
        lng: currentOwner?.place?.coord?.coordinates?.[1],
      },
    },
  });
  return { ...formProps };
};

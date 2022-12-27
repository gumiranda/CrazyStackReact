import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { OptionBase } from "chakra-react-select";
export interface DaysOptions extends OptionBase {
  label: string;
  value: string;
}
export type CreateOwnerFormData = {
  name: string;
  description: string;
  minimumTimeForReSchedule?: number;
  active?: boolean;
  haveDelivery?: boolean;
  days1Options?: DaysOptions[];
  days2Options?: DaysOptions[];
  days3Options?: DaysOptions[];
};

export type SubmitCreateOwnerHandler = SubmitHandler<CreateOwnerFormData>;

export const createOwnerFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  days1Options: yup
    .array()
    .required("É necessário selecionar pelo menos um dia da semana")
    .min(2, "É necessário selecionar pelo menos um dia da semana")
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    ),
  days2Options: yup
    .array()
    .min(2, "É necessário selecionar pelo menos um dia da semana")
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    ),
  days3Options: yup
    .array()
    .min(2, "É necessário selecionar pelo menos um dia da semana")
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    ),
  minimumTimeForReSchedule: yup.number().min(30).required("Descrição é obrigatória"),
});

export const useCreateOwnerLib = () => {
  const formProps = useForm<CreateOwnerFormData>({
    resolver: yupResolver(createOwnerFormSchema),
    defaultValues: {
      name: "",
      description: "",
      minimumTimeForReSchedule: 30,
      days1Options: [],
      days2Options: [],
      days3Options: [],
    },
  });
  return { ...formProps };
};

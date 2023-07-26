import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateServiceFormData = {
  name: string;
  active?: boolean;
  categoryId?: string;
  description: string;
  price: number;
  appointmentsTotal?: number;
  duration: number;
  productsQuantityNeeded: number;
  finalPrice: number;
  comission: number;
  havePromotionalPrice?: boolean;
  hasFidelityGenerator?: boolean;
  canPayWithFidelityPoints?: boolean;
};

export type SubmitCreateServiceHandler = SubmitHandler<CreateServiceFormData>;

export const createServiceFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição obrigatória"),
  price: yup
    .number()
    .notRequired()
    .test(
      "is-decimal",
      "Valor inválido",
      (value) => (value + "").match(/^\d*\.{1}\d*$/) as any
    ),
  duration: yup.number().required("Duração obrigatória").min(15).max(180),
  productsQuantityNeeded: yup.number().required("Campo obrigatório"),
  finalPrice: yup
    .number()
    .required("Campo obrigatório")
    .test(
      "is-decimal",
      "Valor inválido",
      (value) => (value + "").match(/^\d*\.{1}\d*$/) as any
    ),
  comission: yup.number().required("Campo obrigatório").min(0).max(100),
});

export const useCreateServiceLib = () => {
  const formProps = useForm<CreateServiceFormData>({
    resolver: yupResolver(createServiceFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      duration: 30,
      productsQuantityNeeded: 0,
      finalPrice: 0,
      comission: 0,
    },
  });
  return { ...formProps };
};

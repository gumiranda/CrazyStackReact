import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditServiceFormProps } from "./EditServiceForm";
export type EditServiceFormData = {
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

export type SubmitEditServiceHandler = SubmitHandler<EditServiceFormData>;

export const editServiceFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição obrigatória"),
  price: yup.number().notRequired(),
  // .test(
  //   "is-decimal",
  //   "Valor inválido",
  //   (value) => (value + "").match(/^\d*\.{1}\d*$/) as any
  // ),
  duration: yup.number().required("Duração obrigatória").min(15).max(180),
  productsQuantityNeeded: yup.number().required("Campo obrigatório"),
  finalPrice: yup.number().required("Campo obrigatório"),
  comission: yup.number().required("Campo obrigatório").min(0).max(100),
});

export const useEditServiceLib = (props: EditServiceFormProps) => {
  const { service: currentService } = props;
  const formProps = useForm<EditServiceFormData>({
    resolver: yupResolver(editServiceFormSchema),
    defaultValues: {
      name: currentService?.name ?? "",
      description: currentService?.description ?? "",
      price: currentService?.price ?? 0,
      duration: currentService?.duration ?? 30,
      productsQuantityNeeded: currentService?.productsQuantityNeeded ?? 0,
      finalPrice: currentService?.finalPrice ?? 0,
      comission: currentService?.comission ?? 0,
    },
  });
  return { ...formProps };
};

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

export const editServiceFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição obrigatória"),
  price: yup
    .number()
    .typeError("Digite números decimais utilizando o ponto")
    .notRequired()
    .test("is-decimal", "Valor inválido", (value) => !isNaN(value as number)),

  duration: yup.number().required("Duração obrigatória").min(15).max(180),
  productsQuantityNeeded: yup.number().required("Campo obrigatório"),
  finalPrice: yup
    .number()
    .typeError("Digite números decimais utilizando o ponto")
    .required("Campo obrigatório")
    .test("is-decimal", "Valor inválido", (value) => !isNaN(value as number)),

  comission: yup.number().required("Campo obrigatório").min(0).max(100),
});
export type YupSchema = yup.InferType<typeof editServiceFormSchema>;

export const useEditServiceLib = (props: EditServiceFormProps) => {
  const { service: currentService } = props;
  const formProps = useForm<YupSchema>({
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

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

export const createServiceFormSchema = yup.object({
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
export type YupSchema = yup.InferType<typeof createServiceFormSchema>;

export const useCreateServiceLib = () => {
  const formProps = useForm<YupSchema>({
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

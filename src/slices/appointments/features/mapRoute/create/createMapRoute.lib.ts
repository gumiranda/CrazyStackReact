import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type CreateMapRouteFormData = {
  name: string;
  originText: string;
  destinationText: string;
  source_id: string;
  destination_id: string;
  active?: boolean;
};

export type SubmitCreateMapRouteHandler = SubmitHandler<CreateMapRouteFormData>;

export const createMapRouteFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  originText: yup.string().required("Origem é obrigatória"),
  destinationText: yup.string().required("Destino é obrigatório"),
});
export type YupSchema = yup.InferType<typeof createMapRouteFormSchema>;

export const useCreateMapRouteLib = () => {
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(createMapRouteFormSchema),
    defaultValues: {
      name: "",
      originText: "",
      destinationText: "",
    },
  });
  return { ...formProps };
};

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Point } from "@/entidades/mapRoute/mapRoute.model";
export type CreateRouteDriverFormData = {
  name: string;
  routeId: string;
  points: Point[];
  status: string;
  active?: boolean;
};

export type SubmitCreateRouteDriverHandler = SubmitHandler<CreateRouteDriverFormData>;

export const createRouteDriverFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  routeId: yup.string().required("Rota ID é obrigatório"),
});
export type YupSchema = yup.InferType<typeof createRouteDriverFormSchema>;

export const useCreateRouteDriverLib = () => {
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(createRouteDriverFormSchema),
    defaultValues: {
      name: "",
      routeId: "",
    },
  });
  return { ...formProps };
};

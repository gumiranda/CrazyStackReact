import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditRouteDriverFormProps } from "./EditRouteDriverForm";
export type EditRouteDriverFormData = {
  name: string;
  status: string;
};

export type SubmitEditRouteDriverHandler = SubmitHandler<EditRouteDriverFormData>;

export const editRouteDriverFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  status: yup.string(),
});
export type YupSchema = yup.InferType<typeof editRouteDriverFormSchema>;

export const useEditRouteDriverLib = (props: EditRouteDriverFormProps) => {
  const { routeDriver: currentRouteDriver } = props;
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(editRouteDriverFormSchema),
    defaultValues: {
      name: currentRouteDriver?.name ?? "",
      status: currentRouteDriver?.status ?? "",
    },
  });
  return { ...formProps };
};

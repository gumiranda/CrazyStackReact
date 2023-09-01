import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditRouteDriverFormProps } from "./EditRouteDriverForm";
export type EditRouteDriverFormData = {
  name: string;
};

export type SubmitEditRouteDriverHandler = SubmitHandler<EditRouteDriverFormData>;

export const editRouteDriverFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useEditRouteDriverLib = (props: EditRouteDriverFormProps) => {
  const { routeDriver: currentRouteDriver } = props;
  const formProps = useForm<EditRouteDriverFormData>({
    resolver: yupResolver(editRouteDriverFormSchema),
    defaultValues: {
      name: currentRouteDriver?.name ?? "",
    },
  });
  return { ...formProps };
};

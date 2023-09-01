import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditMapRouteFormProps } from "./EditMapRouteForm";
export type EditMapRouteFormData = {
  name: string;
};

export type SubmitEditMapRouteHandler = SubmitHandler<EditMapRouteFormData>;

export const editMapRouteFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useEditMapRouteLib = (props: EditMapRouteFormProps) => {
  const { mapRoute: currentMapRoute } = props;
  const formProps = useForm<EditMapRouteFormData>({
    resolver: yupResolver(editMapRouteFormSchema),
    defaultValues: {
      name: currentMapRoute?.name ?? "",
    },
  });
  return { ...formProps };
};

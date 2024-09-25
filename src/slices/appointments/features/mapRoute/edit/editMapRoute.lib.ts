import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditMapRouteFormProps } from "./EditMapRouteForm";
export type EditMapRouteFormData = {
  name: string;
  originText: string;
  destinationText: string;
  source_id: string;
  destination_id: string;
  active?: boolean;
};

export type SubmitEditMapRouteHandler = SubmitHandler<EditMapRouteFormData>;

export const editMapRouteFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  originText: yup.string().required("Origem é obrigatória"),
  destinationText: yup.string().required("Destino é obrigatório"),
});
export type YupSchema = yup.InferType<typeof editMapRouteFormSchema>;

export const useEditMapRouteLib = (props: EditMapRouteFormProps) => {
  const { mapRoute: currentMapRoute } = props;
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(editMapRouteFormSchema),
    defaultValues: {
      name: currentMapRoute?.name ?? "",
      originText: currentMapRoute?.source?.name ?? "",
      destinationText: currentMapRoute?.destination?.name ?? "",
    },
  });
  return { ...formProps };
};

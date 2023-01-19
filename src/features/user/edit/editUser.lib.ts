import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditUserFormProps } from "./EditUserForm";
import { ServiceOptions } from "features/user/serviceListMultiple";
import { ServiceProps } from "entidades/service";
export type EditUserFormData = {
  name: string;
  role?: string;
  ownerId?: string;
  myOwnerId?: string;
  serviceIds?: string[];
  serviceOptions?: ServiceOptions[];
};

export type SubmitEditUserHandler = SubmitHandler<EditUserFormData>;

export const editUserFormSchema = yup.object().shape({
  serviceOptions: yup
    .array()
    .required("É necessário selecionar pelo menos um serviço")
    .min(1, "É necessário selecionar pelo menos um serviço")
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    ),
  name: yup.string().required("Nome é obrigatório"),
});
interface EditUserLib extends EditUserFormProps {
  services: ServiceProps[];
  prevServiceOptions?: ServiceOptions[];
}
export const useEditUserLib = (props: EditUserLib) => {
  const { user: currentUser, prevServiceOptions } = props;
  const formProps = useForm<EditUserFormData>({
    resolver: yupResolver(editUserFormSchema),
    defaultValues: {
      name: currentUser?.name ?? "",
      role: currentUser?.role ?? "",
      ownerId: currentUser?.ownerId ?? "",
      myOwnerId: currentUser?.myOwnerId ?? "",
      serviceIds: currentUser?.serviceIds ?? [],
      serviceOptions: prevServiceOptions ?? [],
    },
  });
  return { ...formProps };
};

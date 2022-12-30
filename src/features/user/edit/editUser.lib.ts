import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditUserFormProps } from "./EditUserForm";
export type EditUserFormData = {
  name: string;
  active?: boolean;
  role?: string;
  ownerId?: string;
  myOwnerId?: string;
  serviceIds?: string[];
};

export type SubmitEditUserHandler = SubmitHandler<EditUserFormData>;

export const editUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useEditUserLib = (props: EditUserFormProps) => {
  const { user: currentUser } = props;
  const formProps = useForm<EditUserFormData>({
    resolver: yupResolver(editUserFormSchema),
    defaultValues: {
      name: currentUser?.name ?? "",
    },
  });
  return { ...formProps };
};

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditOwnerFormProps } from "./EditOwnerForm";
export type EditOwnerFormData = {
  name: string;
};

export type SubmitEditOwnerHandler = SubmitHandler<EditOwnerFormData>;

export const editOwnerFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export const useEditOwnerLib = (props: EditOwnerFormProps) => {
  const { owner: currentOwner } = props;
  const formProps = useForm<EditOwnerFormData>({
    resolver: yupResolver(editOwnerFormSchema),
    defaultValues: {
      name: currentOwner?.name ?? "",
    },
  });
  return { ...formProps };
};

import { useUi } from "shared/libs";
import { EditOwnerFormProps } from "./EditOwnerForm";
import {
  EditOwnerFormData,
  SubmitEditOwnerHandler,
  useEditOwnerLib,
} from "./editOwner.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
export const useEditOwner = (props: EditOwnerFormProps) => {
  const { showModal } = useUi();
  const { owner: currentOwner } = props;
  const router = useRouter();
  const editOwner = useMutation(async (owner: EditOwnerFormData) => {
    try {
      const { data } = await api.patch(`/owner/update?_id=${currentOwner._id}`, {
        ...owner,
        updatedAt: new Date(),
      });
      if (!data) {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
        return;
      }
      showModal({
        content: "Dono editada com sucesso, você será redirecionado para a lista de donos",
        title: "Sucesso",
        type: "success",
      });
      router.push("/owners/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
  const { register, handleSubmit, formState } = useEditOwnerLib(props);
  const handleEditOwner: SubmitEditOwnerHandler = async (values: EditOwnerFormData) => {
    await editOwner.mutateAsync(values);
  };
  return { formState, register, handleSubmit, handleEditOwner };
};

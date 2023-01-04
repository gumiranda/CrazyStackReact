import { useUi } from "shared/libs";
import { EditRequestFormProps } from "./EditRequestForm";
import {
  EditRequestFormData,
  SubmitEditRequestHandler,
  useEditRequestLib,
} from "./editRequest.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
export const useEditRequest = (props: EditRequestFormProps) => {
  const { showModal } = useUi();
  const { request: currentRequest } = props;
  const router = useRouter();
  const editRequest = useMutation(async (request: EditRequestFormData) => {
    try {
      const { data } = await api.patch(`/request/update?_id=${currentRequest._id}`, {
        ...request,
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
        content:
          "Solicitacao editada com sucesso, você será redirecionado para a lista de solicitacaos",
        title: "Sucesso",
        type: "success",
      });
      router.push("/requests/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
  const { register, handleSubmit, formState } = useEditRequestLib(props);
  const handleEditRequest: SubmitEditRequestHandler = async (
    values: EditRequestFormData
  ) => {
    await editRequest.mutateAsync(values);
  };
  return { formState, register, handleSubmit, handleEditRequest };
};

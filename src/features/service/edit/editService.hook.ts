import { useUi } from "shared/libs";
import { EditServiceFormProps } from "./EditServiceForm";
import {
  EditServiceFormData,
  SubmitEditServiceHandler,
  useEditServiceLib,
} from "./editService.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
export const useEditService = (props: EditServiceFormProps) => {
  const { showModal } = useUi();
  const { service: currentService } = props;
  const router = useRouter();
  const editService = useMutation(async (service: EditServiceFormData) => {
    try {
      const { data } = await api.patch(`/service/update?_id=${currentService._id}`, {
        ...service,
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
          "Serviço editada com sucesso, você será redirecionado para a lista de serviços",
        title: "Sucesso",
        type: "success",
      });
      router.push("/services/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
  const { register, handleSubmit, formState } = useEditServiceLib(props);
  const handleEditService: SubmitEditServiceHandler = async (
    values: EditServiceFormData
  ) => {
    await editService.mutateAsync(values);
  };
  return { formState, register, handleSubmit, handleEditService };
};

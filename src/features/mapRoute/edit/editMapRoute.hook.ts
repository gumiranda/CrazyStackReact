import { useUi } from "shared/libs";
import { EditMapRouteFormProps } from "./EditMapRouteForm";
import {
  EditMapRouteFormData,
  SubmitEditMapRouteHandler,
  useEditMapRouteLib,
} from "./editMapRoute.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
export const useEditMapRoute = (props: EditMapRouteFormProps) => {
  const { showModal } = useUi();
  const { mapRoute: currentMapRoute } = props;
  const router = useRouter();
  const editMapRoute = useMutation(async (mapRoute: EditMapRouteFormData) => {
    try {
      const { data } = await api.patch(`/mapRoute/update?_id=${currentMapRoute._id}`, {
        ...mapRoute,
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
          "Rotas editada com sucesso, você será redirecionado para a lista de rotas",
        title: "Sucesso",
        type: "success",
      });
      router.push("/mapRoutes/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
  const { register, handleSubmit, formState } = useEditMapRouteLib(props);
  const handleEditMapRoute: SubmitEditMapRouteHandler = async (
    values: EditMapRouteFormData
  ) => {
    await editMapRoute.mutateAsync(values);
  };
  return { formState, register, handleSubmit, handleEditMapRoute };
};

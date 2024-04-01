import { useUi } from "@/shared/libs";
import { EditMapRouteFormProps } from "./EditMapRouteForm";
import {
  EditMapRouteFormData,
  SubmitEditMapRouteHandler,
  useEditMapRouteLib,
} from "./editMapRoute.lib";
import { useRouter } from "next/router";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useHandleLocation } from "../hooks";

export const useEditMapRoute = (props: EditMapRouteFormProps) => {
  const { showModal } = useUi();
  const { mapRoute: currentMapRoute, mapContainerRef } = props;
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
          "Rota editada com sucesso," + "você será redirecionado para a lista de rotas",
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
  const { register, handleSubmit, formState, watch } = useEditMapRouteLib(props);

  const originText = watch("originText");
  const destinationText = watch("destinationText");
  const { originListPlaces, destinationListPlaces, fetchDirections, directionsData } =
    useHandleLocation({
      originText,
      destinationText,
      mapContainerRef,
      currentMapRoute,
    });
  const handleEditMapRoute: SubmitEditMapRouteHandler = async (
    values: EditMapRouteFormData
  ) => {
    const currentOrigin: any = originListPlaces?.find?.(
      (item: any) => item?.label === values?.originText
    );
    const currentDestination: any = destinationListPlaces?.find?.(
      (item: any) => item?.label === values?.destinationText
    );
    await editMapRoute.mutateAsync({
      ...values,
      source_id: currentOrigin?.value,
      destination_id: currentDestination?.value,
    });
  };
  return {
    formState,
    register,
    handleSubmit,
    handleEditMapRoute,
    fetchDirections,
    originText,
    destinationText,
    directionsData,
    originListPlaces,
    destinationListPlaces,
  };
};

import { useUi } from "shared/libs";
import {
  CreateMapRouteFormData,
  SubmitCreateMapRouteHandler,
  useCreateMapRouteLib,
} from "./createMapRoute.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useHandleLocation } from "../hooks";

export const useCreateMapRoute = ({ mapContainerRef }: any) => {
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);

  const createMapRoute = useMutation(async (mapRoute: CreateMapRouteFormData) => {
    try {
      const { data } = await api.post("/mapRoute/add", {
        ...mapRoute,
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
        content: "Rotas criada com sucesso, você será redirecionado para a lista de rotas",
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
  const { register, handleSubmit, formState, watch } = useCreateMapRouteLib();
  const originText = watch("originText");
  const destinationText = watch("destinationText");
  const { originListPlaces, destinationListPlaces, fetchDirections, directionsData } =
    useHandleLocation({
      originText,
      destinationText,
      mapContainerRef,
    });
  const handleCreateMapRoute: SubmitCreateMapRouteHandler = async (
    values: CreateMapRouteFormData
  ) => {
    const currentOrigin: any = originListPlaces?.find?.(
      (item: any) => item?.label === values?.originText
    );
    const currentDestination: any = destinationListPlaces?.find?.(
      (item: any) => item?.label === values?.destinationText
    );
    await createMapRoute.mutateAsync({
      ...values,
      active,
      source_id: currentOrigin?.value,
      destination_id: currentDestination?.value,
    });
  };

  return {
    formState,
    register,
    handleSubmit,
    handleCreateMapRoute,
    active,
    setActive,
    originListPlaces,
    destinationListPlaces,
    fetchDirections,
    directionsData,
    destinationText,
    originText,
  };
};

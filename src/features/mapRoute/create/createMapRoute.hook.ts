import { useUi } from "shared/libs";
import {
  CreateMapRouteFormData,
  SubmitCreateMapRouteHandler,
  useCreateMapRouteLib,
} from "./createMapRoute.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";

export const useCreateMapRoute = () => {
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [originListPlaces, setOriginListPlaces] = useState([]);
  const [destinationListPlaces, setDestinationListPlaces] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

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
  const originText = watch("originText");
  const destinationText = watch("destinationText");
  const fetchTextOptions = async (text: string, setPlaces: any) => {
    if (text?.length < 1) {
      return;
    }
    const cookies = parseCookies();
    try {
      const sourceResponse = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_API_URL}/places?text=${text}`,
        {
          headers: {
            ContentType: "application/json",
            authorization: `Bearer ${cookies["belezixadmin.token"]}`,
          },
        }
      );
      if (sourceResponse?.status !== 200) {
        setPlaces([]);
        return;
      }
      const sourcePlace = await sourceResponse.json();
      setPlaces(
        sourcePlace?.candidates?.map?.(({ name, place_id }: any) => ({
          label: name,
          value: place_id,
        })) ?? []
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function getTextPlaces() {
      await fetchTextOptions(originText, setOriginListPlaces);
    }
    if (timeoutId === null) {
      const id: any = window.setTimeout(getTextPlaces, 1500);
      setTimeoutId(id);
    } else {
      window.clearTimeout(timeoutId);
      const id: any = window.setTimeout(getTextPlaces, 1500);
      setTimeoutId(id);
    }
  }, [originText]);
  useEffect(() => {
    async function getTextPlaces() {
      await fetchTextOptions(destinationText, setDestinationListPlaces);
    }
    if (timeoutId === null) {
      const id: any = window.setTimeout(getTextPlaces, 1500);
      setTimeoutId(id);
    } else {
      window.clearTimeout(timeoutId);
      const id: any = window.setTimeout(getTextPlaces, 1500);
      setTimeoutId(id);
    }
  }, [destinationText]);
  return {
    formState,
    register,
    handleSubmit,
    handleCreateMapRoute,
    active,
    setActive,
    originListPlaces,
    destinationListPlaces,
  };
};

import { useUi } from "@/shared/libs";
import {
  CreateMapRouteFormData,
  SubmitCreateMapRouteHandler,
  useCreateMapRouteLib,
} from "./createMapRoute.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useHandleLocation } from "../hooks";
import { useTranslation } from "react-i18next";

export const useCreateMapRoute = ({ mapContainerRef }: any) => {
  const { t } = useTranslation(["PAGES"]);
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [originSelectedValue, setOriginSelectedValue] = useState<string | null>(null);
  const [destinationSelectedValue, setDestinationSelectedValue] = useState<string | null>(
    null
  );
  const createMapRoute = useMutation({
    mutationFn: async (mapRoute: CreateMapRouteFormData) => {
      try {
        const { data } = await api.post("/mapRoute/add", {
          ...mapRoute,
        });
        if (!data) {
          showModal({
            content: t("PAGES:MESSAGES.errorMessage", {
              defaultValue:
                "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
            }),
            title: t("PAGES:MESSAGES.internalServerError", {
              defaultValue: "Erro no servidor",
            }),
            type: "error",
          });
          return;
        }
        showModal({
          content: t("PAGES:MESSAGES.successMessage", {
            domain: t("PAGES:HOME_PAGE.route", {
              defaultValue: "Rota",
            }),
            operation: t("PAGES:MESSAGES.create", {
              defaultValue: "criada",
            }),
            defaultValue:
              "Rota criada com sucesso, você será redirecionado para a lista de rotas",
          }),
          title: t("PAGES:MESSAGES.success", {
            defaultValue: "Sucesso",
          }),
          type: "success",
        });
        router.push("/mapRoutes/1");
        return data;
      } catch (error) {
        showModal({
          content: t("PAGES:MESSAGES.errorMessage", {
            defaultValue:
              "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          }),
          title: t("PAGES:MESSAGES.internalServerError", {
            defaultValue: "Erro no servidor",
          }),
          type: "error",
        });
      }
    },
  });
  const { register, handleSubmit, formState, watch, setValue } = useCreateMapRouteLib();
  const handleCreateMapRoute: SubmitCreateMapRouteHandler = async (
    values: CreateMapRouteFormData
  ) => {
    const currentOrigin: any = originListPlaces?.find?.(
      (item: any) => item?.label === values?.originText
    ) ?? { value: originSelectedValue };
    const currentDestination: any = destinationListPlaces?.find?.(
      (item: any) => item?.label === values?.destinationText
    ) ?? { value: destinationSelectedValue };
    await createMapRoute.mutateAsync({
      ...values,
      active,
      source_id: currentOrigin?.value,
      destination_id: currentDestination?.value,
    });
  };
  const originText = watch("originText");
  const destinationText = watch("destinationText");
  const { originListPlaces, destinationListPlaces, fetchDirections, directionsData } =
    useHandleLocation({
      originText,
      destinationText,
      mapContainerRef,
      originSelectedValue,
      destinationSelectedValue,
    });
  return {
    formState,
    register,
    handleSubmit,
    handleCreateMapRoute,
    active,
    setActive,
    originListPlaces,
    destinationListPlaces,
    directionsData,
    fetchDirections,
    originText,
    destinationText,
    setValue,
    originSelectedValue,
    setOriginSelectedValue,
    destinationSelectedValue,
    setDestinationSelectedValue,
  };
};

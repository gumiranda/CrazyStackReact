import { useUi } from "@/shared/libs";
import {
  CreateRouteDriverFormData,
  SubmitCreateRouteDriverHandler,
  useCreateRouteDriverLib,
} from "./createRouteDriver.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useCreateRouteDriver = () => {
  const { t } = useTranslation(["PAGES"]);
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const createRouteDriver = useMutation({
    mutationFn: async (routeDriver: CreateRouteDriverFormData) => {
      try {
        const { data } = await api.post("/routeDriver/add", {
          ...routeDriver,
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
            domain: t("PAGES:HOME_PAGE.ride", {
              defaultValue: "Corrida",
            }),
            operation: t("PAGES:MESSAGES.create", {
              defaultValue: "criada",
            }),
            defaultValue:
              "Corrida criada com sucesso, você será redirecionado para a lista de corridas",
          }),
          title: t("PAGES:MESSAGES.success", {
            defaultValue: "Sucesso",
          }),
          type: "success",
        });
        router.push("/routeDrivers/1");
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
  const { register, handleSubmit, formState } = useCreateRouteDriverLib();
  const handleCreateRouteDriver: SubmitCreateRouteDriverHandler = async (
    values: CreateRouteDriverFormData
  ) => {
    await createRouteDriver.mutateAsync({
      ...values,
      active,
      points: [],
      status: "initialized",
    });
  };
  return {
    formState,
    register,
    handleSubmit,
    handleCreateRouteDriver,
    active,
    setActive,
  };
};

import { useUi } from "shared/libs";
import {
  CreateRouteDriverFormData,
  SubmitCreateRouteDriverHandler,
  useCreateRouteDriverLib,
} from "./createRouteDriver.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
export const useCreateRouteDriver = () => {
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const createRouteDriver = useMutation(async (routeDriver: CreateRouteDriverFormData) => {
    try {
      const { data } = await api.post("/routeDriver/add", {
        ...routeDriver,
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
          "Corridas criada com sucesso, você será redirecionado para a lista de corridas",
        title: "Sucesso",
        type: "success",
      });
      router.push("/routeDrivers/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
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
  return { formState, register, handleSubmit, handleCreateRouteDriver, active, setActive };
};

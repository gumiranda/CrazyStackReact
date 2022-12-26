import { useUi } from "shared/libs";
import {
  CreateUserFormData,
  SubmitCreateUserHandler,
  useCreateUserLib,
} from "./createUser.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { GetServicesResponse } from "entidades/service";
import { useServicesSelect } from "features/service/serviceList.hook";
type CreateUserFormProps = {
  serviceList: GetServicesResponse;
};
export const useCreateUser = ({ serviceList }: CreateUserFormProps) => {
  const { showModal } = useUi();
  const { serviceSelected, setServiceSelected, handleChangeServiceSelected, services } =
    useServicesSelect({ serviceList });
  const router = useRouter();
  const [active, setActive] = useState(false);
  const createUser = useMutation(async (user: CreateUserFormData) => {
    try {
      const { data } = await api.post("/user/add", {
        ...user,
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
          "Usuario criada com sucesso, você será redirecionado para a lista de usuarios",
        title: "Sucesso",
        type: "success",
      });
      router.push("/users/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
  const { register, handleSubmit, formState } = useCreateUserLib();
  const handleCreateUser: SubmitCreateUserHandler = async (values: CreateUserFormData) => {
    await createUser.mutateAsync({
      ...values,
      serviceIds: [serviceSelected],
      active,
      role: "professional",
    });
  };
  return {
    formState,
    register,
    handleSubmit,
    handleCreateUser,
    active,
    setActive,
    handleChangeServiceSelected,
    services,
    serviceSelected,
  };
};

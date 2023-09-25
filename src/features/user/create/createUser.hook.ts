import { useServiceListMultiple } from "./../serviceListMultiple";
import { useOwnersSelect } from "features/owner/ownerList.hook";
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
import { GetOwnersResponse, OwnerProps } from "entidades/owner";
type CreateUserFormProps = {
  serviceList: GetServicesResponse;
  ownerList: GetOwnersResponse;
};
export const useCreateUser = ({ serviceList, ownerList }: CreateUserFormProps) => {
  const { showModal } = useUi();
  const router = useRouter();
  const { serviceOptions } = useServiceListMultiple({ serviceList });

  const { ownerSelected, handleChangeOwnerSelected, owners } = useOwnersSelect({
    ownerList,
  });
  const [active, setActive] = useState(false);
  const createUser = useMutation(async (user: CreateUserFormData) => {
    try {
      const { data } = await api.post("/user/add", user);
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
          "Profissional criada com sucesso, você será redirecionado para a lista de profissionais",
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
  const { register, handleSubmit, formState, control } = useCreateUserLib();
  const handleCreateUser: SubmitCreateUserHandler = async (
    values: CreateUserFormData
  ) => {
    await createUser.mutateAsync({
      ...values,
      active,
      serviceIds: values?.serviceOptions?.map?.((service) => service?.value),
      ownerId: ownerSelected,
      myOwnerId: owners?.find?.((owner: OwnerProps) => owner?._id === ownerSelected)?._id,
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
    control,
    serviceOptions,
    handleChangeOwnerSelected,
    owners,
    ownerSelected,
  };
};

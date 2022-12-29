import { useUi } from "shared/libs";
import {
  CreateRequestFormData,
  SubmitCreateRequestHandler,
  useCreateRequestLib,
} from "./createRequest.lib";
import { useRouter } from "next/router";
import { api } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { GetOwnersResponse } from "entidades/owner";
import { useOwnersSelect } from "features/owner/ownerList.hook";
import { useUsersSelect } from "features/user/userList.hook";
type CreateRequestFormProps = {
  ownerList: GetOwnersResponse;
};
export const useCreateRequest = ({ ownerList }: CreateRequestFormProps) => {
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const { ownerSelected, handleChangeOwnerSelected, owners } = useOwnersSelect({
    ownerList,
  });
  const { userSelected, handleChangeUserSelected, users } = useUsersSelect({
    ownerSelected,
  });
  const createRequest = useMutation(async (request: CreateRequestFormData) => {
    try {
      const { data } = await api.post("/request/add", {
        ...request,
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
          "Solicitação criada com sucesso, você será redirecionado para a lista de solicitações",
        title: "Sucesso",
        type: "success",
      });
      router.push("/requests/1");
      return data;
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    }
  }, {});
  const { register, handleSubmit, formState } = useCreateRequestLib();
  const handleCreateRequest: SubmitCreateRequestHandler = async (
    values: CreateRequestFormData
  ) => {
    await createRequest.mutateAsync({ ...values, active });
  };
  return {
    formState,
    register,
    handleSubmit,
    handleCreateRequest,
    active,
    setActive,
    handleChangeOwnerSelected,
    owners,
    ownerSelected,
    userSelected,
    handleChangeUserSelected,
    users,
  };
};

/* eslint-disable react-hooks/rules-of-hooks */
import { useUi } from "@/shared/libs";
import {
  CreateClientFormData,
  SubmitCreateClientHandler,
  useCreateClientLib,
} from "./createClient.lib";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ClientCreateFormProps } from "./CreateClientForm";
import { useUsersSelect } from "@/features/user/userList.hook";

export const useCreateClient = ({ userList }: ClientCreateFormProps) => {
  const { showModal } = useUi();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const { userSelected, handleChangeUserSelected, users } = useUsersSelect({
    role: "client",
    userList,
  });
  const createClient = createClientMutation(showModal, router);
  const { register, handleSubmit, formState } = useCreateClientLib();
  const handleCreateClient: SubmitCreateClientHandler = async (
    values: CreateClientFormData
  ) => {
    await createClient.mutateAsync({
      ...values,
      active,
      userId: userSelected ?? users?.[0]?._id,
    });
  };
  return {
    formState,
    register,
    handleSubmit,
    handleCreateClient,
    active,
    setActive,
    userSelected,
    handleChangeUserSelected,
    users,
  };
};

export function createClientMutation(showModal: Function, router) {
  return useMutation({
    mutationFn: async (client: CreateClientFormData) => {
      try {
        const { data } = await api.post("/client/add", {
          ...client,
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
            "Cliente criada com sucesso, você será redirecionado para a lista de clientes",
          title: "Sucesso",
          type: "success",
        });
        if (router) {
          router.push("/clients/1");
        }
        return data;
      } catch (error) {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
  });
}

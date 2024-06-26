"use client";
import { GetUsersResponse } from "@/entidades/user/user.api";
import { useState, useEffect } from "react";
import { useUi } from "@/shared/libs";
import { api, queryClientInstance } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { UserProps } from "@/entidades/user";
import { useRouter } from "next/navigation";
type UserListHook = {
  initialData: GetUsersResponse;
  page: number;
};
export const useUserList = (data: UserListHook) => {
  const router = useRouter();
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [users, setUsers] = useState(data?.initialData?.users ?? []);
  const handlePrefetchUser = async ({ _id: userId }: any) => {
    // await queryClientInstance.prefetchQuery(
    //   ["user", userId],
    //   async () => {
    //     const { data = null } =
    //       (await api.get(`/user/load?_id=${userId}`)) || {};
    //     return data;
    //   },
    //   { staleTime: 1000 * 60 * 10 },
    // );
  };
  const deleteUser = useMutation({
    mutationFn: async (usersToDelete: any = []) => {
      try {
        if (usersToDelete?.length > 0) {
          return Promise.all(
            usersToDelete?.map?.((user: any) =>
              api.delete(`/user/delete?_id=${user._id}`)
            )
          );
        }
        return null;
      } catch (error) {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
    onSuccess: () => {
      queryClientInstance.invalidateQueries(["users", data.page] as any);
      queryClientInstance.refetchQueries(["users", data.page] as any);
      router.refresh();
    },
    onError: () => {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    },
    retry: 3,
  });
  const deleteSelectedAction = async () => {
    deleteUser.mutateAsync(users.filter((user: UserProps) => user.value) as any);
  };
  const changePage = (newpage: number) => {
    router.replace(`/users/${newpage}`);
  };
  useEffect(() => {
    setUsers(data?.initialData?.users ?? []);
  }, [data?.initialData?.users]);
  return {
    users,
    setUsers,
    handlePrefetchUser,
    deleteSelectedAction,
    page,
    setPage: changePage,
    total: data?.initialData?.totalCount,
  };
};

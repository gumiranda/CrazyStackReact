"use client";
import { GetOwnersResponse } from "@/entidades/owner/owner.api";
import { useState, useEffect } from "react";
import { useUi } from "@/shared/libs";
import { api, queryClientInstance } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { OwnerProps } from "@/entidades/owner";
import { useRouter } from "next/navigation";
type OwnerListHook = {
  initialData: GetOwnersResponse;
  page: number;
};
export const useOwnerList = (data: OwnerListHook) => {
  const router = useRouter();
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [owners, setOwners] = useState(data?.initialData?.owners ?? []);
  const handlePrefetchOwner = async ({ _id: ownerId }: any) => {
    // await queryClientInstance.prefetchQuery(
    //   ["owner", ownerId],
    //   async () => {
    //     const { data = null } =
    //       (await api.get(`/owner/load?_id=${ownerId}`)) || {};
    //     return data;
    //   },
    //   { staleTime: 1000 * 60 * 10 },
    // );
  };
  const deleteOwner = useMutation({
    mutationFn: async (ownersToDelete: any = []) => {
      try {
        if (ownersToDelete?.length > 0) {
          return Promise.all(
            ownersToDelete?.map?.((owner: any) =>
              api.delete(`/owner/delete?_id=${owner._id}`)
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
      queryClientInstance.invalidateQueries(["owners", data.page] as any);
      queryClientInstance.refetchQueries(["owners", data.page] as any);
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
  } as any);
  const deleteSelectedAction = async () => {
    deleteOwner.mutateAsync(owners.filter((owner: OwnerProps) => owner.value) as any);
  };
  const changePage = (newpage: number) => {
    router.replace(`/owners/${newpage}`);
  };
  useEffect(() => {
    setOwners(data?.initialData?.owners ?? []);
  }, [data?.initialData?.owners]);
  return {
    owners,
    setOwners,
    handlePrefetchOwner,
    deleteSelectedAction,
    page,
    setPage: changePage,
    total: data?.initialData?.totalCount,
  };
};

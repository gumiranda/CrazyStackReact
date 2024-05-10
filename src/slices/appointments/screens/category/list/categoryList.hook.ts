"use client";
import { GetCategorysResponse } from "@/slices/appointments/entidades/category/category.api";
import { useState, useEffect } from "react";
import { useUi } from "@/shared/libs";
import { api, queryClientInstance } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { CategoryProps } from "@/slices/appointments/entidades/category";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
type CategoryListHook = {
  initialData: GetCategorysResponse;
  page: number;
};
export const useCategoryList = (data: CategoryListHook) => {
  const { t } = useTranslation(["PAGES"]);

  const router = useRouter();
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [categorys, setCategorys] = useState(data?.initialData?.categorys ?? []);
  const handlePrefetchCategory = async ({ _id: categoryId }: any) => {
    // await queryClientInstance.prefetchQuery(
    //   ["category", categoryId],
    //   async () => {
    //     const { data = null } =
    //       (await api.get(`/category/load?_id=${categoryId}`)) || {};
    //     return data;
    //   },
    //   { staleTime: 1000 * 60 * 10 },
    // );
  };
  const deleteCategory = useMutation({
    onSuccess: () => {
      queryClientInstance.invalidateQueries(["categorys", data.page] as any);
      queryClientInstance.refetchQueries(["categorys", data.page] as any);
      router.refresh();
    },
    onError: () => {
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
    },
    retry: 3,
    mutationFn: (async (categorysToDelete: any = []) => {
      try {
        if (categorysToDelete?.length > 0) {
          return Promise.all(
            categorysToDelete?.map?.((category: any) =>
              api.delete(`/category/delete?_id=${category._id}`)
            )
          );
        }
        return null;
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
    }) as any,
  });
  const deleteSelectedAction = async () => {
    deleteCategory.mutateAsync(
      categorys.filter((category: CategoryProps) => category.value) as any
    );
  };
  const changePage = (newpage: number) => {
    router.replace(`/categorys/${newpage}`);
  };
  useEffect(() => {
    setCategorys(data?.initialData?.categorys ?? []);
  }, [data?.initialData?.categorys]);
  return {
    categorys,
    setCategorys,
    handlePrefetchCategory,
    deleteSelectedAction,
    page,
    setPage: changePage,
    total: data?.initialData?.totalCount,
  };
};

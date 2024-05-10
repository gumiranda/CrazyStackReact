"use client";

import { InfiniteList, GenericGrid } from "@/shared/ui";
import { useCategoryInfiniteList } from "../categoryInfiniteList.hook";
import { useCategoryUi } from "@/slices/appointments/entidades/category/category.ui";
import { useTranslation } from "react-i18next";

export const CategoryGridPage = () => {
  const { t } = useTranslation(["PAGES"]);
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useCategoryInfiniteList();
  const categoryGridProps = {
    categorys:
      fetchData?.pages
        ?.map?.((page: any) => page?.categorys)
        ?.reduce?.((a: any, b: any) => a.concat(b)) ??
      fetchData ??
      [],
    isLoading: loading,
    error,
    isFetching,
    deleteSelectedAction,
    fields: [
      {
        id: "name",
        label: t("PAGES:FIELDS.name", {
          defaultValue: "Nome",
        }),
        displayKeyText: true,
      },
      {
        id: "createdAt",
        label: t("PAGES:FIELDS.createdAt", {
          defaultValue: "Data de criação",
        }),
        displayKeyText: true,
      },
    ],
  };
  const items =
    categoryGridProps?.categorys?.map?.((item: any) => ({
      item,
      fields: categoryGridProps.fields,
      mainField: "name",
    })) ?? [];
  const { renderItem } = useCategoryUi({ deleteSelectedAction });
  return (
    <>
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName="categorias"
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/categorys/list"}
          routeList={"/categorys/1"}
          routeCreate={"/categorys/create"}
          entityDisplayName={t("PAGES:HOME_PAGE.category", {
            defaultValue: "Categoria",
          })}
          title={t("PAGES:HOME_PAGE.categorys", {
            defaultValue: "Categorias",
          })}
          {...categoryGridProps}
        />
      </InfiniteList>
    </>
  );
};

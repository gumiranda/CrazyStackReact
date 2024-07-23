"use client";
import { InfiniteList, GenericGrid, Head } from "@/shared/ui";
import { useRequestInfiniteList } from "../requestInfiniteList.hook";
import { useRequestUi } from "@/entidades/request/request.ui";
import { useTranslation } from "react-i18next";

export const RequestGridPage = () => {
  const { t } = useTranslation(["PAGES"]);
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useRequestInfiniteList();
  const requestGridProps = {
    requests:
      fetchData?.pages
        ?.map?.((page: any) => page?.requests)
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
    requestGridProps?.requests?.map?.((item: any) => ({
      item,
      fields: requestGridProps.fields,
      mainField: "name",
    })) ?? [];
  const { renderItem } = useRequestUi({ deleteSelectedAction });
  return (
    <>
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName={t("PAGES:HOME_PAGE.requests", {
          defaultValue: "Solicitações",
        })}
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/requests/list"}
          routeList={"/requests/1"}
          routeCreate={"/requests/create"}
          entityDisplayName={t("PAGES:HOME_PAGE.request", {
            defaultValue: "Solicitação",
          })}
          title={t("PAGES:HOME_PAGE.requests", {
            defaultValue: "Solicitações",
          })}
          {...requestGridProps}
        />
      </InfiniteList>
    </>
  );
};

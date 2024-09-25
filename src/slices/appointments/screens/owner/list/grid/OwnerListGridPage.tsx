"use client";
import { InfiniteList, GenericGrid, Head } from "@/shared/ui";
import { useOwnerInfiniteList } from "../ownerInfiniteList.hook";
import { useOwnerUi } from "@/slices/appointments/entidades/owner/owner.ui";
import { useTranslation } from "react-i18next";

export const OwnerGridPage = () => {
  const { t } = useTranslation(["PAGES"]);

  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useOwnerInfiniteList();
  const ownerGridProps = {
    owners:
      fetchData?.pages
        ?.map?.((page: any) => page?.owners)
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
    ownerGridProps?.owners?.map?.((item: any) => ({
      item,
      fields: ownerGridProps.fields,
      mainField: "name",
    })) ?? [];
  const { renderItem } = useOwnerUi({ deleteSelectedAction });
  return (
    <InfiniteList
      hasNextPage={hasNextPage as any}
      fetchNextPage={fetchNextPage}
      entityName="estabelecimentos"
    >
      <GenericGrid
        items={items}
        renderItem={renderItem}
        route={"/owners/list"}
        routeList={"/owners/1"}
        routeCreate={"/owners/create"}
        entityDisplayName={t("PAGES:HOME_PAGE.owner", {
          defaultValue: "Estabelecimento",
        })}
        title={t("PAGES:HOME_PAGE.owners", {
          defaultValue: "Estabelecimentos",
        })}
        {...ownerGridProps}
      />
    </InfiniteList>
  );
};

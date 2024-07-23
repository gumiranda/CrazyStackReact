"use client";
import { InfiniteList, GenericGrid, Head } from "@/shared/ui";
import { useUserInfiniteList } from "../userInfiniteList.hook";
import { useUserUi } from "@/entidades/user/user.ui";
import { useTranslation } from "react-i18next";

export const UserGridPage = () => {
  const { t } = useTranslation(["PAGES"]);
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useUserInfiniteList();
  const userGridProps = {
    users:
      fetchData?.pages
        ?.map?.((page: any) => page?.users)
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
    userGridProps?.users?.map?.((item: any) => ({
      item,
      fields: userGridProps.fields,
      mainField: "name",
    })) ?? [];
  const { renderItem } = useUserUi({ deleteSelectedAction });
  return (
    <>
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName="profissionais"
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/users/list"}
          routeList={"/users/1"}
          routeCreate={"/users/create"}
          entityDisplayName={"Profissional"}
          title={"Profissionais"}
          {...userGridProps}
        />
      </InfiniteList>
    </>
  );
};

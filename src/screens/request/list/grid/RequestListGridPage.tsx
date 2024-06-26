"use client";
import { InfiniteList, GenericGrid, Head } from "@/shared/ui";
import { useRequestInfiniteList } from "../requestInfiniteList.hook";
import { useRequestUi } from "@/entidades/request/request.ui";

export const RequestGridPage = () => {
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
      { id: "name", label: "Nome", displayKeyText: true },
      { id: "createdAt", label: "Data de criação", displayKeyText: true },
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
      <Head
        title={"Belezix Admin | Solicitações"}
        description="Página de listagem de solicitações do painel de Admin Belezix"
      />
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName="solicitações"
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/requests/list"}
          routeList={"/requests/1"}
          routeCreate={"/requests/create"}
          entityDisplayName={"Solicitação"}
          title={"Solicitações"}
          {...requestGridProps}
        />
      </InfiniteList>
    </>
  );
};

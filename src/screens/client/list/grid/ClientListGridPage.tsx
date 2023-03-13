import { InfiniteList, GenericGrid, Head } from "shared/ui";
import { useClientInfiniteList } from "../clientInfiniteList.hook";
import { useClientUi } from "entidades/client/client.ui";

export const ClientGridPage = () => {
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useClientInfiniteList();
  const clientGridProps = {
    clients:
      fetchData?.pages
        ?.map?.((page: any) => page?.clients)
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
    clientGridProps?.clients?.map?.((item: any) => ({
      item,
      fields: clientGridProps.fields,
      mainField: "name",
    })) ?? [];
  const { renderItem } = useClientUi({ deleteSelectedAction });
  return (
    <>
      <Head
        title={"Belezix Admin | Clientes"}
        description="Página de listagem de clientes do painel de Admin Belezix"
      />
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName="clientes"
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/clients/list"}
          routeList={"/clients/1"}
          routeCreate={"/clients/create"}
          entityDisplayName={"Cliente"}
          title={"Clientes"}
          {...clientGridProps}
        />
      </InfiniteList>
    </>
  );
};

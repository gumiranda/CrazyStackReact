import { InfiniteList, GenericGrid, Head } from "@/shared/ui";
import { useServiceInfiniteList } from "../serviceInfiniteList.hook";
import { useServiceUi } from "@/entidades/service/service.ui";

export const ServiceGridPage = () => {
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useServiceInfiniteList();
  const serviceGridProps = {
    services:
      fetchData?.pages
        ?.map?.((page: any) => page?.services)
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
    serviceGridProps?.services?.map?.((item: any) => ({
      item,
      fields: serviceGridProps.fields,
      mainField: "name",
    })) ?? [];
  const { renderItem } = useServiceUi({ deleteSelectedAction });
  return (
    <>
      <Head
        title={"Belezix Admin | Serviços"}
        description="Página de listagem de serviços do painel de Admin Belezix"
      />
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName="serviços"
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/services/list"}
          routeList={"/services/1"}
          routeCreate={"/services/create"}
          entityDisplayName={"Serviço"}
          title={"Serviços"}
          {...serviceGridProps}
        />
      </InfiniteList>
    </>
  );
};

import { InfiniteList, GenericGrid, Head } from "shared/ui";
import { useRouteDriverInfiniteList } from "../routeDriverInfiniteList.hook";
import { useRouteDriverUi } from "entidades/routeDriver/routeDriver.ui";

export const RouteDriverGridPage = () => {
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useRouteDriverInfiniteList();
  const routeDriverGridProps = {
    routeDrivers:
      fetchData?.pages
        ?.map?.((page: any) => page?.routeDrivers)
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
    routeDriverGridProps?.routeDrivers?.map?.((item: any) => ({
      item,
      fields: routeDriverGridProps.fields,
      mainField: "name",
    })) ?? [];
  const { renderItem } = useRouteDriverUi({ deleteSelectedAction });
  return (
    <>
      <Head
        title={"Belezix Admin | Corridas"}
        description="Página de listagem de corridas do painel de Admin Belezix"
      />
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName="corridas"
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/routeDrivers/list"}
          routeList={"/routeDrivers/1"}
          routeCreate={"/routeDrivers/create"}
          entityDisplayName={"Corridas"}
          title={"Corridas"}
          {...routeDriverGridProps}
        />
      </InfiniteList>
    </>
  );
};

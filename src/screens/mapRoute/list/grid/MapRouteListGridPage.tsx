import { InfiniteList, GenericGrid, Head } from "shared/ui";
import { useMapRouteInfiniteList } from "../mapRouteInfiniteList.hook";
import { useMapRouteUi } from "entidades/mapRoute/mapRoute.ui";

export const MapRouteGridPage = () => {
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useMapRouteInfiniteList();
  const mapRouteGridProps = {
    mapRoutes:
      fetchData?.pages
        ?.map?.((page: any) => page?.mapRoutes)
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
    mapRouteGridProps?.mapRoutes?.map?.((item: any) => ({
      item,
      fields: mapRouteGridProps.fields,
      mainField: "name",
    })) ?? [];
  const { renderItem } = useMapRouteUi({ deleteSelectedAction });
  return (
    <>
      <Head
        title={"Belezix Admin | Rotas"}
        description="Página de listagem de rotas do painel de Admin Belezix"
      />
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName="rotas"
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/mapRoutes/list"}
          routeList={"/mapRoutes/1"}
          routeCreate={"/mapRoutes/create"}
          entityDisplayName={"Rotas"}
          title={"Rotas"}
          {...mapRouteGridProps}
        />
      </InfiniteList>
    </>
  );
};

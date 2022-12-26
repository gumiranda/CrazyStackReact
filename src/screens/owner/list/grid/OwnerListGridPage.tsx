import { InfiniteList, GenericGrid, Head } from "shared/ui";
import { useOwnerInfiniteList } from "../ownerInfiniteList.hook";
import { useOwnerUi } from "entidades/owner/owner.ui";

export const OwnerGridPage = () => {
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
      { id: "name", label: "Nome", displayKeyText: true },
      { id: "createdAt", label: "Data de criação", displayKeyText: true },
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
    <>
      <Head
        title={"Belezix Admin | Donos"}
        description="Página de listagem de donos do painel de Admin Belezix"
      />
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName="donos"
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/owners/list"}
          routeList={"/owners/1"}
          routeCreate={"/owners/create"}
          entityDisplayName={"Dono"}
          title={"Donos"}
          {...ownerGridProps}
        />
      </InfiniteList>
    </>
  );
};

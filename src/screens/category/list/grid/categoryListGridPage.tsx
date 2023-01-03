import { InfiniteList, GenericGrid, Head } from "shared/ui";
import { useCategoryInfiniteList } from "../categoryInfiniteList.hook";
import { useCategoryUi } from "entidades/category/category.ui";

export const CategoryGridPage = () => {
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
      { id: "name", label: "Nome", displayKeyText: true },
      { id: "createdAt", label: "Data de criação", displayKeyText: true },
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
      <Head
        title={"Belezix Admin | Categorias"}
        description="Página de listagem de categorias do painel de Admin Belezix"
      />
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
          entityDisplayName={"Categoria"}
          title={"Categorias"}
          {...categoryGridProps}
        />
      </InfiniteList>
    </>
  );
};

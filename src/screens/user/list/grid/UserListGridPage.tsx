import { InfiniteList, GenericGrid, Head } from "@/shared/ui";
import { useUserInfiniteList } from "../userInfiniteList.hook";
import { useUserUi } from "@/entidades/user/user.ui";

export const UserGridPage = () => {
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
      { id: "name", label: "Nome", displayKeyText: true },
      { id: "createdAt", label: "Data de criação", displayKeyText: true },
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
      <Head
        title={"Belezix Admin | Profissionais"}
        description="Página de listagem de profissionais do painel de Admin Belezix"
      />
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

import { Box, GenericTable, Head, Pagination } from "@/shared/ui";
import { GetCategorysResponse } from "@/entidades/category/category.api";
import { useCategoryList } from "../categoryList.hook";
type CategoryListTablePageProps = {
  data: GetCategorysResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const CategoryListTablePage = ({ page = 0, data }: CategoryListTablePageProps) => {
  const {
    categorys,
    setCategorys,
    handlePrefetchCategory,
    deleteSelectedAction,
    total,
    setPage,
  } = useCategoryList({
    page,
    initialData: data,
  });
  return (
    <>
      <Head
        title={"Belezix Admin | Categorias"}
        description="Página de listagem de categorias do painel de Admin Belezix"
      />
      <Box borderRadius={8} bg="purple.800" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={categorys}
          fields={[
            { id: "name", label: "Nome", displayKeyText: true },
            {
              id: "createdAt",
              label: "Data de criação",
              displayKeyText: false,
              children: <Text />,
            },
          ]}
          setItems={setCategorys}
          linkOnMouseEnter={handlePrefetchCategory}
          error={undefined}
          route={"/categorys"}
          routeDetails={"/categorys/details"}
          routeCreate={"/categorys/create"}
          routeList={"/categorys/list"}
          title={"Categorias"}
        />
        <Pagination
          onPageChange={setPage}
          currentPage={page}
          totalCountOfRegisters={total}
        />
      </Box>
    </>
  );
};

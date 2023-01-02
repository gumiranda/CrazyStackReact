import { Box, GenericTable, Head } from "shared/ui";
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const CategoryListTablePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Categorias"}
        description="Página de listagem de categorias do painel de Admin Belezix"
      />
      <Box borderRadius={8} bg="purple.800" p="4" flexGrow="1">
        <GenericTable
          isLoading={false}
          items={[
            { _id: "11233", name: "valuetest", createdAt: new Date().toDateString() },
          ]}
          fields={[
            { id: "name", label: "Nome", displayKeyText: true },
            {
              id: "createdAt",
              label: "Data de criação",
              displayKeyText: false,
              children: <Text />,
            },
          ]}
          setItems={() => {}}
          linkOnMouseEnter={() => {}}
          error={undefined}
          route={"/categorys"}
          routeCreate={"/categorys/create"}
          routeList={"/categorys/list"}
          title={"Categorias"}
        />
      </Box>
    </>
  );
};

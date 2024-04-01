import { Box, GenericTable, Head, Pagination } from "@/shared/ui";
import { GetRouteDriversResponse } from "@/entidades/routeDriver/routeDriver.api";
import { useRouteDriverList } from "../routeDriverList.hook";
type RouteDriverListTablePageProps = {
  data: GetRouteDriversResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const RouteDriverListTablePage = ({
  page = 0,
  data,
}: RouteDriverListTablePageProps) => {
  const {
    routeDrivers,
    setRouteDrivers,
    handlePrefetchRouteDriver,
    deleteSelectedAction,
    total,
    setPage,
  } = useRouteDriverList({
    page,
    initialData: data,
  });
  return (
    <>
      <Head
        title={"Belezix Admin | Corridas"}
        description="Página de listagem de corridas do painel de Admin Belezix"
      />
      <Box borderRadius={8} bg="purple.800" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={routeDrivers}
          fields={[
            { id: "name", label: "Nome", displayKeyText: true },
            {
              id: "createdAt",
              label: "Data de criação",
              displayKeyText: false,
              children: <Text />,
            },
          ]}
          setItems={setRouteDrivers}
          linkOnMouseEnter={handlePrefetchRouteDriver}
          error={undefined}
          route={"/routeDrivers"}
          routeDetails={"/routeDrivers/details"}
          routeCreate={"/routeDrivers/create"}
          routeList={"/routeDrivers/list"}
          title={"Corridas"}
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

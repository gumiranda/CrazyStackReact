import { Box, GenericTable, Head, Pagination } from "@/shared/ui";
import { GetMapRoutesResponse } from "@/entidades/mapRoute/mapRoute.api";
import { useMapRouteList } from "../mapRouteList.hook";
type MapRouteListTablePageProps = {
  data: GetMapRoutesResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const MapRouteListTablePage = ({ page = 0, data }: MapRouteListTablePageProps) => {
  const {
    mapRoutes,
    setMapRoutes,
    handlePrefetchMapRoute,
    deleteSelectedAction,
    total,
    setPage,
  } = useMapRouteList({
    page,
    initialData: data,
  });
  return (
    <>
      <Head
        title={"Belezix Admin | Rotas"}
        description="Página de listagem de rotas do painel de Admin Belezix"
      />
      <Box borderRadius={8} bg="secondary.500" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={mapRoutes}
          fields={[
            { id: "name", label: "Nome", displayKeyText: true },
            {
              id: "createdAt",
              label: "Data de criação",
              displayKeyText: false,
              children: <Text />,
            },
          ]}
          setItems={setMapRoutes}
          linkOnMouseEnter={handlePrefetchMapRoute}
          error={undefined}
          route={"/mapRoutes"}
          routeDetails={"/mapRoutes/details"}
          routeCreate={"/mapRoutes/create"}
          routeList={"/mapRoutes/list"}
          title={"Rotas"}
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

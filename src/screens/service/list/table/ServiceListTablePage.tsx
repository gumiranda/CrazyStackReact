import { Box, GenericTable, Head, Pagination } from "shared/ui";
import { GetServicesResponse } from "entidades/service/service.api";
import { useServiceList } from "../serviceList.hook";
type ServiceListTablePageProps = {
  data: GetServicesResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const ServiceListTablePage = ({ page = 0, data }: ServiceListTablePageProps) => {
  const {
    services,
    setServices,
    handlePrefetchService,
    deleteSelectedAction,
    total,
    setPage,
  } = useServiceList({
    page,
    initialData: data,
  });
  return (
    <>
      <Head
        title={"Belezix Admin | Serviços"}
        description="Página de listagem de serviços do painel de Admin Belezix"
      />
      <Box borderRadius={8} bg="purple.800" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={services}
          fields={[
            { id: "name", label: "Nome", displayKeyText: true },
            {
              id: "createdAt",
              label: "Data de criação",
              displayKeyText: false,
              children: <Text />,
            },
          ]}
          setItems={setServices}
          linkOnMouseEnter={handlePrefetchService}
          error={undefined}
          route={"/services"}
          routeDetails={"/services/details"}
          routeCreate={"/services/create"}
          routeList={"/services/list"}
          title={"Serviços"}
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

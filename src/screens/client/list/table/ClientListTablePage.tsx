import { Box, GenericTable, Head, Pagination } from "@/shared/ui";
import { GetClientsResponse } from "@/entidades/client/client.api";
import { useClientList } from "../clientList.hook";
type ClientListTablePageProps = {
  data: GetClientsResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const ClientListTablePage = ({ page = 0, data }: ClientListTablePageProps) => {
  const {
    clients,
    setClients,
    handlePrefetchClient,
    deleteSelectedAction,
    total,
    setPage,
  } = useClientList({
    page,
    initialData: data,
  });
  return (
    <>
      <Head
        title={"Belezix Admin | Clientes"}
        description="Página de listagem de clientes do painel de Admin Belezix"
      />
      <Box borderRadius={8} bg="secondary.500" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={clients}
          fields={[
            { id: "name", label: "Nome", displayKeyText: true },
            {
              id: "createdAt",
              label: "Data de criação",
              displayKeyText: false,
              children: <Text />,
            },
          ]}
          setItems={setClients}
          linkOnMouseEnter={handlePrefetchClient}
          error={undefined}
          route={"/clients"}
          routeDetails={"/clients/details"}
          routeCreate={"/clients/create"}
          routeList={"/clients/list"}
          title={"Clientes"}
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

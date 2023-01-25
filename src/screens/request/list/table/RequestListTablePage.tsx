import { Box, GenericTable, Head, Pagination } from "shared/ui";
import { GetRequestsResponse } from "entidades/request/request.api";
import { useRequestList } from "../requestList.hook";
type RequestListTablePageProps = {
  data: GetRequestsResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const RequestListTablePage = ({ page = 0, data }: RequestListTablePageProps) => {
  const {
    requests,
    setRequests,
    handlePrefetchRequest,
    deleteSelectedAction,
    total,
    setPage,
  } = useRequestList({
    page,
    initialData: data,
  });
  return (
    <>
      <Head
        title={"Belezix Admin | Solicitações"}
        description="Página de listagem de solicitações do painel de Admin Belezix"
      />
      <Box borderRadius={8} bg="purple.800" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={requests}
          fields={[
            { id: "message", label: "Mensagem", displayKeyText: true },
            {
              id: "createdAt",
              label: "Data de criação",
              displayKeyText: false,
              children: <Text />,
            },
          ]}
          setItems={setRequests}
          linkOnMouseEnter={handlePrefetchRequest}
          error={undefined}
          route={"/requests"}
          routeDetails={"/requests/details"}
          routeCreate={"/requests/create"}
          routeList={"/requests/list"}
          title={"Solicitações"}
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

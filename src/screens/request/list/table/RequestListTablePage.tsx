"use client";
import { Box, GenericTable, Head, Pagination } from "@/shared/ui";
import { GetRequestsResponse } from "@/entidades/request/request.api";
import { useRequestList } from "../requestList.hook";
import { useBreakpointValue } from "@chakra-ui/react";
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
  const isMobile = useBreakpointValue({ base: true, md: false });
  const fieldsMobile = [
    { id: "initDateFormatted", label: "Data do agendamento", displayKeyText: true },
    {
      id: "endHour",
      label: "Horário Fim",
      displayKeyText: true,
    },
  ];
  const fields = [
    ...fieldsMobile,
    {
      id: "initHour",
      label: "Horário Início",
      displayKeyText: true,
    },
    { id: "clientName", label: "Cliente", displayKeyText: true },
    {
      id: "professionalName",
      label: "Profissional",
      displayKeyText: true,
    },
    {
      id: "ownerName",
      label: "Estabelecimento",
      displayKeyText: true,
    },
  ];
  return (
    <Box borderRadius={8} bg="secondary.500" p="4" flexGrow="1">
      <GenericTable
        deleteSelectedAction={deleteSelectedAction}
        isLoading={false}
        items={requests}
        fields={isMobile ? fieldsMobile : fields}
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
  );
};

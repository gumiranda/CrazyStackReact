"use client";
import { Box, GenericTable, Pagination, useBreakpointValue } from "@/shared/ui";
import { GetRequestsResponse } from "@/slices/appointments/entidades/request/request.api";
import { useRequestList } from "../requestList.hook";
import { useTranslation } from "react-i18next";
type RequestListTablePageProps = {
  data: GetRequestsResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const RequestListTablePage = ({ page = 0, data }: RequestListTablePageProps) => {
  const { t } = useTranslation(["PAGES"]);

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
    {
      id: "datePickerSelected",
      label: t("PAGES:FIELDS.datePickerSelected", {
        defaultValue: "Data",
      }),
      displayKeyText: true,
    },
    {
      id: "initHour",
      label: t("PAGES:FIELDS.initHour", {
        defaultValue: "Horário Início",
      }),
      displayKeyText: true,
    },
    {
      id: "endHour",
      label: t("PAGES:FIELDS.endHour", {
        defaultValue: "Horário Fim",
      }),
      displayKeyText: true,
    },
  ];
  const fields = [
    ...fieldsMobile,

    {
      id: "clientName",
      label: t("PAGES:HOME_PAGE.client", {
        defaultValue: "Cliente",
      }),
      displayKeyText: true,
    },
    {
      id: "professionalName",
      label: t("PAGES:HOME_PAGE.professional", {
        defaultValue: "Profissional",
      }),
      displayKeyText: true,
    },
    {
      id: "ownerName",
      label: t("PAGES:HOME_PAGE.owner", {
        defaultValue: "Estabelecimento",
      }),
      displayKeyText: true,
    },
    {
      id: "statusLabel",
      label: t("PAGES:FIELDS.statusLabel", {
        defaultValue: "Status",
      }),
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
        title={t("PAGES:HOME_PAGE.requests", {
          defaultValue: "Solicitações",
        })}
      />
      <Pagination
        onPageChange={setPage}
        currentPage={page}
        totalCountOfRegisters={total}
      />
    </Box>
  );
};

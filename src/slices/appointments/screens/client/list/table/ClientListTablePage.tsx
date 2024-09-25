"use client";
import { Box, GenericTable, Head, Pagination } from "@/shared/ui";
import { GetClientsResponse } from "@/slices/appointments/entidades/client/client.api";
import { useClientList } from "../clientList.hook";
import { useTranslation } from "react-i18next";
type ClientListTablePageProps = {
  data: GetClientsResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const ClientListTablePage = ({ page = 0, data }: ClientListTablePageProps) => {
  const { t } = useTranslation(["PAGES"]);
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
      <Box borderRadius={8} bg="secondary.500" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={clients}
          fields={[
            {
              id: "name",
              label: t("PAGES:FIELDS.name", {
                defaultValue: "Nome",
              }),
              displayKeyText: true,
            },
            {
              id: "createdAt",
              label: t("PAGES:FIELDS.createdAt", {
                defaultValue: "Data de criação",
              }),
              displayKeyText: true,
            },
          ]}
          setItems={setClients}
          linkOnMouseEnter={handlePrefetchClient}
          error={undefined}
          route={"/clients"}
          routeDetails={"/clients/details"}
          routeCreate={"/clients/create"}
          routeList={"/clients/list"}
          title={t("PAGES:HOME_PAGE.clients", {
            defaultValue: "Clientes",
          })}
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

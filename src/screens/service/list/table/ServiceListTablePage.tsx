"use client";
import { Box, GenericTable, Head, Pagination } from "@/shared/ui";
import { GetServicesResponse } from "@/entidades/service/service.api";
import { useServiceList } from "../serviceList.hook";
import { useTranslation } from "react-i18next";
type ServiceListTablePageProps = {
  data: GetServicesResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const ServiceListTablePage = ({ page = 0, data }: ServiceListTablePageProps) => {
  const { t } = useTranslation(["PAGES"]);

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
      <Box borderRadius={8} bg="secondary.500" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={services}
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
          setItems={setServices}
          linkOnMouseEnter={handlePrefetchService}
          error={undefined}
          route={"/services"}
          routeDetails={"/services/details"}
          routeCreate={"/services/create"}
          routeList={"/services/list"}
          title={t("PAGES:HOME_PAGE.services", {
            defaultValue: "Serviços",
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

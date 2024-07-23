"use client";
import { Box, GenericTable, Head, Pagination } from "@/shared/ui";
import { GetMapRoutesResponse } from "@/entidades/mapRoute/mapRoute.api";
import { useMapRouteList } from "../mapRouteList.hook";
import { useTranslation } from "react-i18next";
type MapRouteListTablePageProps = {
  data: GetMapRoutesResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const MapRouteListTablePage = ({ page = 0, data }: MapRouteListTablePageProps) => {
  const { t } = useTranslation(["PAGES"]);
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
    <Box borderRadius={8} bg="secondary.500" p="4" flexGrow="1">
      <GenericTable
        deleteSelectedAction={deleteSelectedAction}
        isLoading={false}
        items={mapRoutes}
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
        setItems={setMapRoutes}
        linkOnMouseEnter={handlePrefetchMapRoute}
        error={undefined}
        route={"/mapRoutes"}
        routeDetails={"/mapRoutes/details"}
        routeCreate={"/mapRoutes/create"}
        routeList={"/mapRoutes/list"}
        title={t("PAGES:HOME_PAGE.routes", {
          defaultValue: "Rotas",
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

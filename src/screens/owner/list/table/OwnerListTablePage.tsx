"use client";
import { Box, GenericTable, Head, Pagination } from "@/shared/ui";
import { GetOwnersResponse } from "@/entidades/owner/owner.api";
import { useOwnerList } from "../ownerList.hook";
import { useTranslation } from "react-i18next";
type OwnerListTablePageProps = {
  data: GetOwnersResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const OwnerListTablePage = ({ page = 0, data }: OwnerListTablePageProps) => {
  const { t } = useTranslation(["PAGES"]);
  const { owners, setOwners, handlePrefetchOwner, deleteSelectedAction, total, setPage } =
    useOwnerList({
      page,
      initialData: data,
    });
  return (
    <Box borderRadius={8} bg="secondary.500" p="4" flexGrow="1">
      <GenericTable
        deleteSelectedAction={deleteSelectedAction}
        isLoading={false}
        items={owners}
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
        setItems={setOwners}
        linkOnMouseEnter={handlePrefetchOwner}
        error={undefined}
        route={"/owners"}
        routeDetails={"/owners/details"}
        routeCreate={"/owners/create"}
        routeList={"/owners/list"}
        title={t("PAGES:HOME_PAGE.owners", {
          defaultValue: "Estabelecimentos",
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

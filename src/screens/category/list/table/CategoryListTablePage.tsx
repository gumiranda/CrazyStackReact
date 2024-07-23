"use client";

import { Box, GenericTable, Head, Pagination } from "@/shared/ui";
import { GetCategorysResponse } from "@/entidades/category/category.api";
import { useCategoryList } from "../categoryList.hook";
import { useTranslation } from "react-i18next";
type CategoryListTablePageProps = {
  data: GetCategorysResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const CategoryListTablePage = ({ page = 0, data }: CategoryListTablePageProps) => {
  const { t } = useTranslation(["PAGES"]);

  const {
    categorys,
    setCategorys,
    handlePrefetchCategory,
    deleteSelectedAction,
    total,
    setPage,
  } = useCategoryList({
    page,
    initialData: data,
  });
  return (
    <>
      <Box borderRadius={8} bg="secondary.500" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={categorys}
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
          setItems={setCategorys}
          linkOnMouseEnter={handlePrefetchCategory}
          error={undefined}
          route={"/categorys"}
          routeDetails={"/categorys/details"}
          routeCreate={"/categorys/create"}
          routeList={"/categorys/list"}
          title={t("PAGES:HOME_PAGE.categorys", {
            defaultValue: "Categorias",
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

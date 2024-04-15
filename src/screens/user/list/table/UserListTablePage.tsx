"use client";
import { Box, GenericTable, Head, Pagination } from "@/shared/ui";
import { GetUsersResponse } from "@/entidades/user/user.api";
import { useUserList } from "../userList.hook";
import { useTranslation } from "react-i18next";
type UserListTablePageProps = {
  data: GetUsersResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const UserListTablePage = ({ page = 0, data }: UserListTablePageProps) => {
  const { t } = useTranslation(["PAGES"]);
  const { users, setUsers, handlePrefetchUser, deleteSelectedAction, total, setPage } =
    useUserList({
      page,
      initialData: data ?? { users: [] },
    });
  return (
    <>
      <Box borderRadius={8} bg="secondary.500" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={users}
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
              displayKeyText: false,
              children: <Text />,
            },
          ]}
          setItems={setUsers}
          linkOnMouseEnter={handlePrefetchUser}
          error={undefined}
          route={"/users"}
          routeDetails={"/users/details"}
          routeCreate={"/users/create"}
          routeList={"/users/list"}
          title={"Profissionais"}
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

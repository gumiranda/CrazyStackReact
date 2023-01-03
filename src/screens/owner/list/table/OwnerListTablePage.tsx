import { Box, GenericTable, Head, Pagination } from "shared/ui";
import { GetOwnersResponse } from "entidades/owner/owner.api";
import { useOwnerList } from "../ownerList.hook";
type OwnerListTablePageProps = {
  data: GetOwnersResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const OwnerListTablePage = ({ page = 0, data }: OwnerListTablePageProps) => {
  const {
    owners,
    setOwners,
    handlePrefetchOwner,
    deleteSelectedAction,
    total,
    setPage,
  } = useOwnerList({
    page,
    initialData: data,
  });
  return (
    <>
      <Head
        title={"Belezix Admin | Estabelecimentos"}
        description="Página de listagem de estabelecimentos do painel de Admin Belezix"
      />
      <Box borderRadius={8} bg="purple.800" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={ owners}
          fields={[
            { id: "name", label: "Nome", displayKeyText: true },
            {
              id: "createdAt",
              label: "Data de criação",
              displayKeyText: false,
              children: <Text />,
            },
          ]}
          setItems={setOwners}
          linkOnMouseEnter={handlePrefetchOwner }
          error={undefined}
          route={"/owners"}
          routeDetails={"/owners/details"}
          routeCreate={"/owners/create"}
          routeList={"/owners/list"}
          title={"Estabelecimentos"}
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

import { Box, Head } from "shared/ui";
import { CreateRequestForm } from "features/request/create";
import { GetOwnersResponse } from "entidades/owner";

type RequestCreatePageProps = {
  owners: GetOwnersResponse;
};
export const RequestCreatePage = ({ owners }: RequestCreatePageProps) => {
  return (
    <>
      <Head
        title={"Belezix Admin | Solicitações"}
        description="Página de criação de solicitações do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CreateRequestForm ownerList={owners} />
      </Box>
    </>
  );
};

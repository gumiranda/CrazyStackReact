import { Box, Head } from "shared/ui";
import { CreateUserForm } from "features/user/create";
import { GetOwnersResponse } from "entidades/owner";
import { GetServicesResponse } from "entidades/service";
type UserCreatePageProps = {
  owner: GetOwnersResponse;
  data: GetServicesResponse;
};
export const UserCreatePage = ({ owner, data }: UserCreatePageProps) => {
  return (
    <>
      <Head
        title={"Belezix Admin | Profissionais"}
        description="Página de criação de profissionais do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CreateUserForm serviceList={data} ownerList={owner} />
      </Box>
    </>
  );
};

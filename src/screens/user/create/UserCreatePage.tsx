import { Box, Head } from "shared/ui";
import { CreateUserForm } from "features/user/create";
import { GetServicesResponse } from "entidades/service";
type ServiceCreatePageProps = {
  data: GetServicesResponse;
};
export const UserCreatePage = ({ data }: ServiceCreatePageProps) => {
  return (
    <>
      <Head
        title={"Belezix Admin | Usuarios"}
        description="Página de criação de usuarios do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CreateUserForm serviceList={data} />
      </Box>
    </>
  );
};

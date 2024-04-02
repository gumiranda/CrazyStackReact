import { Box, Head } from "@/shared/ui";
import { CreateClientForm } from "@/features/client/create";
import { GetUsersResponse } from "@/entidades/user";
type ClientCreatePageProps = {
  users: GetUsersResponse;
};
export const ClientCreatePage = ({ users }: ClientCreatePageProps) => {
  return (
    <>
      <Head
        title={"Belezix Admin | Clientes"}
        description="Página de criação de clientes do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <CreateClientForm userList={users} />
      </Box>
    </>
  );
};

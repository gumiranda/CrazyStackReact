import { Box, Head } from "shared/ui";
import { UserProps } from "entidades/user";
import { CreateUserForm } from "features/user/create";

export const UserCreatePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Usuarios"}
        description="Página de criação de usuarios do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CreateUserForm />
      </Box>
    </>
  );
};

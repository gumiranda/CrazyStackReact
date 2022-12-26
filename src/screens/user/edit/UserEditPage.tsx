import { Box, Head } from "shared/ui";
import { EditUserForm } from "features/user/edit";
import { UserProps } from "entidades/user";
type UserEditProps = {
  data: UserProps;
  id: string;
};
export const UserEditPage = ({ data, id }: UserEditProps) => {
  const props = { user: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Profissionais"}
        description="Página de edição de profissionais do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <EditUserForm {...props} />
      </Box>
    </>
  );
};

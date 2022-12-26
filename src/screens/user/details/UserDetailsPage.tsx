import { Box, Head } from "shared/ui";
import { UserDetails } from "entidades/user/details";
import { UserProps } from "entidades/user";
type UserDetailsProps = {
  data: UserProps;
  id: string;
};
export const UserDetailsPage = ({ data }: UserDetailsProps) => {
  const props = { user: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Usuarios"}
        description="Página de detalhes de usuarios do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <UserDetails {...props} />
      </Box>
    </>
  );
};

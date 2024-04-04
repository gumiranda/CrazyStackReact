"use client";
import { Box, Button, Head } from "@/shared/ui";
import { UserDetails } from "@/entidades/user/details";
import { UserProps } from "@/entidades/user";
import { deleteUserById } from "@/entidades/user/user.api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/libs";

type UserDetailsProps = {
  data: UserProps;
  id: string;
  canDelete?: boolean;
};
export const UserDetailsPage = ({ data, id, canDelete = false }: UserDetailsProps) => {
  const props = { user: data };
  const router = useRouter();
  const { logout = () => {} } = useAuth();
  return (
    <>
      <Head
        title={"Belezix Admin | Profissionais"}
        description="Página de detalhes de profissionais do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <UserDetails {...props} />
        {canDelete === true && (
          <Button
            colorScheme="red"
            onClick={async () => {
              logout?.();
              await deleteUserById(id, null);
              router.push("/login");
            }}
          >
            Deletar conta
          </Button>
        )}
      </Box>
    </>
  );
};

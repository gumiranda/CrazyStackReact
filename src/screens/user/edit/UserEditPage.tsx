"use client";
import { Box, Head } from "@/shared/ui";
import { EditUserForm } from "@/features/user/edit";
import { UserProps } from "@/entidades/user";
import { GetServicesResponse } from "@/entidades/service";
import { GetOwnersResponse } from "@/entidades/owner";
type UserEditProps = {
  data: UserProps;
  id: string;
  service: GetServicesResponse;
  owner: GetOwnersResponse;
};
export const UserEditPage = ({ data, id, service, owner }: UserEditProps) => {
  const props = { user: data, serviceList: service, ownerList: owner };
  return (
    <>
      <Head
        title={"Belezix Admin | Profissionais"}
        description="Página de edição de profissionais do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <EditUserForm {...props} />
      </Box>
    </>
  );
};

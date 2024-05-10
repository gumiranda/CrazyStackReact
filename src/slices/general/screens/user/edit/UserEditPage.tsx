"use client";
import { Box, Head } from "@/shared/ui";
import { EditUserForm } from "@/slices/general/features/user/edit";
import { UserProps } from "@/slices/general/entidades/user";
import { GetServicesResponse } from "@/slices/appointments/entidades/service";
import { GetOwnersResponse } from "@/slices/appointments/entidades/owner";
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
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <EditUserForm {...props} />
      </Box>
    </>
  );
};

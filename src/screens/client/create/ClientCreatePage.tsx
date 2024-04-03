"use client";
import { Box } from "@/shared/ui";
import { CreateClientForm } from "@/features/client/create";
import { GetUsersResponse } from "@/entidades/user";
type ClientCreatePageProps = {
  users: GetUsersResponse;
};
export const ClientCreatePage = ({ users }: ClientCreatePageProps) => {
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <CreateClientForm userList={users} />
      </Box>
    </>
  );
};

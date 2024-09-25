"use client";
import { Box, Head } from "@/shared/ui";
import { EditClientForm } from "@/slices/appointments/features/client/edit";
import { ClientProps } from "@/slices/appointments/entidades/client";
type ClientEditProps = {
  data: ClientProps;
  id: string;
  users: any;
};
export const ClientEditPage = ({ data, id, users }: ClientEditProps) => {
  const props = { client: data, id, users };
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <EditClientForm {...props} />
      </Box>
    </>
  );
};

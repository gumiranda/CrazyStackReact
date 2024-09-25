"use client";
import { Box } from "@/shared/ui";
import { ClientDetails } from "@/slices/appointments/entidades/client/details";
import { ClientProps } from "@/slices/appointments/entidades/client";
type ClientDetailsProps = {
  data: ClientProps;
  id: string;
};
export const ClientDetailsPage = ({ data }: ClientDetailsProps) => {
  const props = { client: data };
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <ClientDetails {...props} />
      </Box>
    </>
  );
};

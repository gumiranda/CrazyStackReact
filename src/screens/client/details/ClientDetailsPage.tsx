"use client";
import { Box, Head } from "@/shared/ui";
import { ClientDetails } from "@/entidades/client/details";
import { ClientProps } from "@/entidades/client";
type ClientDetailsProps = {
  data: ClientProps;
  id: string;
};
export const ClientDetailsPage = ({ data }: ClientDetailsProps) => {
  const props = { client: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Clientes"}
        description="Página de detalhes de clientes do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <ClientDetails {...props} />
      </Box>
    </>
  );
};

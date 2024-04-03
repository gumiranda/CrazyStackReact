"use client";
import { Box, Head } from "@/shared/ui";
import { EditClientForm } from "@/features/client/edit";
import { ClientProps } from "@/entidades/client";
type ClientEditProps = {
  data: ClientProps;
  id: string;
};
export const ClientEditPage = ({ data, id }: ClientEditProps) => {
  const props = { client: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Clientes"}
        description="Página de edição de clientes do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <EditClientForm {...props} />
      </Box>
    </>
  );
};

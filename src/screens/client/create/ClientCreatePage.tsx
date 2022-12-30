import { Box, Head } from "shared/ui";
import { ClientProps } from "entidades/client";
import { CreateClientForm } from "features/client/create";

export const ClientCreatePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Clientes"}
        description="Página de criação de clientes do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CreateClientForm />
      </Box>
    </>
  );
};

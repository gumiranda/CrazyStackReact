import { Box, Head } from "shared/ui";
import { RequestProps } from "entidades/request";
import { CreateRequestForm } from "features/request/create";

export const RequestCreatePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Solicitacaos"}
        description="Página de criação de solicitacaos do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CreateRequestForm />
      </Box>
    </>
  );
};

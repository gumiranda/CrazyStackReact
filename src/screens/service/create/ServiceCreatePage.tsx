import { Box, Head } from "shared/ui";
import { ServiceProps } from "entidades/service";
import { CreateServiceForm } from "features/service/create";

export const ServiceCreatePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Serviços"}
        description="Página de criação de serviços do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CreateServiceForm />
      </Box>
    </>
  );
};

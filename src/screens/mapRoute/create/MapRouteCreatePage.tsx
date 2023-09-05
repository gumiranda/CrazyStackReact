import { Box, Head } from "shared/ui";
import { MapRouteProps } from "entidades/mapRoute";
import { CreateMapRouteForm } from "features/mapRoute/create";

export const MapRouteCreatePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Rotas"}
        description="Página de criação de rotas do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CreateMapRouteForm />
      </Box>
    </>
  );
};

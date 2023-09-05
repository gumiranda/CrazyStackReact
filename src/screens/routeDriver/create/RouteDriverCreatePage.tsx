import { Box, Head } from "shared/ui";
import { RouteDriverProps } from "entidades/routeDriver";
import { CreateRouteDriverForm } from "features/routeDriver/create";

export const RouteDriverCreatePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Corridass"}
        description="Página de criação de corridass do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CreateRouteDriverForm />
      </Box>
    </>
  );
};

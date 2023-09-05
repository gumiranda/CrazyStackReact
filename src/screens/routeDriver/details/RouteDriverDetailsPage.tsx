import { Box, Head } from "shared/ui";
import { RouteDriverDetails } from "entidades/routeDriver/details";
import { RouteDriverProps } from "entidades/routeDriver";
type RouteDriverDetailsProps = {
  data: RouteDriverProps;
  id: string;
};
export const RouteDriverDetailsPage = ({ data }: RouteDriverDetailsProps) => {
  const props = { routeDriver: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Corridas"}
        description="Página de detalhes de corridas do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <RouteDriverDetails {...props} />
      </Box>
    </>
  );
};

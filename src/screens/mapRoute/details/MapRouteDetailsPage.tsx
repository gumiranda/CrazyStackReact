import { Box, Head } from "shared/ui";
import { MapRouteDetails } from "entidades/mapRoute/details";
import { MapRouteProps } from "entidades/mapRoute";
type MapRouteDetailsProps = {
  data: MapRouteProps;
  id: string;
};
export const MapRouteDetailsPage = ({ data }: MapRouteDetailsProps) => {
  const props = { mapRoute: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Rotass"}
        description="Página de detalhes de rotass do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <MapRouteDetails {...props} />
      </Box>
    </>
  );
};

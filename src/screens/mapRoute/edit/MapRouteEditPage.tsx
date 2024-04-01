import { Box, Head } from "@/shared/ui";
import { EditMapRouteForm } from "@/features/mapRoute/edit";
import { MapRouteProps } from "@/entidades/mapRoute";
type MapRouteEditProps = {
  data: MapRouteProps;
  id: string;
};
export const MapRouteEditPage = ({ data, id }: MapRouteEditProps) => {
  const props = { mapRoute: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Rotas"}
        description="Página de edição de rotas do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <EditMapRouteForm {...props} />
      </Box>
    </>
  );
};

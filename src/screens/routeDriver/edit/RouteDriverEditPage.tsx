import { Box, Head } from "@/shared/ui";
import { EditRouteDriverForm } from "@/features/routeDriver/edit";
import { RouteDriverProps } from "@/entidades/routeDriver";
type RouteDriverEditProps = {
  data: RouteDriverProps;
  id: string;
};
export const RouteDriverEditPage = ({ data, id }: RouteDriverEditProps) => {
  const props = { routeDriver: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Corridas"}
        description="Página de edição de corridas do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <EditRouteDriverForm {...props} />
      </Box>
    </>
  );
};

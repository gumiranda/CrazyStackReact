import { Box, Head } from "shared/ui";
import { EditServiceForm } from "features/service/edit";
import { ServiceProps } from "entidades/service";
type ServiceEditProps = {
  data: ServiceProps;
  id: string;
};
export const ServiceEditPage = ({ data, id }: ServiceEditProps) => {
  const props = { service: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Serviços"}
        description="Página de edição de serviços do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <EditServiceForm {...props} />
      </Box>
    </>
  );
};

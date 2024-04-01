import { Box, Head } from "@/shared/ui";
import { ServiceDetails } from "@/entidades/service/details";
import { ServiceProps } from "@/entidades/service";
type ServiceDetailsProps = {
  data: ServiceProps;
  id: string;
};
export const ServiceDetailsPage = ({ data }: ServiceDetailsProps) => {
  const props = { service: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Serviços"}
        description="Página de detalhes de serviços do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <ServiceDetails {...props} />
      </Box>
    </>
  );
};

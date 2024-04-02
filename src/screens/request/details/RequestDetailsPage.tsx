import { Box, Head } from "@/shared/ui";
import { RequestDetails } from "@/entidades/request/details";
import { RequestProps } from "@/entidades/request";
type RequestDetailsProps = {
  data: RequestProps;
  id: string;
};
export const RequestDetailsPage = ({ data }: RequestDetailsProps) => {
  const props = { request: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Solicitações"}
        description="Página de detalhes de solicitações do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <RequestDetails {...props} />
      </Box>
    </>
  );
};

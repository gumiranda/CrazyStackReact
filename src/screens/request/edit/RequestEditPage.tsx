import { Box, Head } from "shared/ui";
import { EditRequestForm } from "features/request/edit";
import { RequestProps } from "entidades/request";
type RequestEditProps = {
  data: RequestProps;
  id: string;
};
export const RequestEditPage = ({ data, id }: RequestEditProps) => {
  const props = { request: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Solicitações"}
        description="Página de edição de solicitações do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <EditRequestForm {...props} />
      </Box>
    </>
  );
};

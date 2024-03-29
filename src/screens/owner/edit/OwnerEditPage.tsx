import { Box, Head } from "shared/ui";
import { EditOwnerForm } from "features/owner/edit";
import { OwnerProps } from "entidades/owner";
type OwnerEditProps = {
  data: OwnerProps;
  id: string;
};
export const OwnerEditPage = ({ data, id }: OwnerEditProps) => {
  const props = { owner: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Estabelecimentos"}
        description="Página de edição de estabelecimentos do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <EditOwnerForm {...props} />
      </Box>
    </>
  );
};

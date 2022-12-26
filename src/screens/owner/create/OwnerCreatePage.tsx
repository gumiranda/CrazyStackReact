import { Box, Head } from "shared/ui";
import { CreateOwnerForm } from "features/owner/create";

export const OwnerCreatePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Donos"}
        description="Página de criação de donos do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CreateOwnerForm />
      </Box>
    </>
  );
};

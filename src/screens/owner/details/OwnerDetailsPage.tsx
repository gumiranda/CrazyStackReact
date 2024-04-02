import { Box, Head } from "@/shared/ui";
import { OwnerDetails } from "@/entidades/owner/details";
import { OwnerProps } from "@/entidades/owner";
type OwnerDetailsProps = {
  data: OwnerProps;
  id: string;
};
export const OwnerDetailsPage = ({ data }: OwnerDetailsProps) => {
  const props = { owner: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Estabelecimentos"}
        description="Página de detalhes de estabelecimentos do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <OwnerDetails {...props} />
      </Box>
    </>
  );
};

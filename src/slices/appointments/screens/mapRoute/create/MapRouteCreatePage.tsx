"use client";
import { Box, Head } from "@/shared/ui";
import { CreateMapRouteForm } from "@/slices/appointments/features/mapRoute/create";

export const MapRouteCreatePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Rotas"}
        description="Página de criação de rotas do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <CreateMapRouteForm />
      </Box>
    </>
  );
};

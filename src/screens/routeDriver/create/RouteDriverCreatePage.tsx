"use client";
import { Box, Head } from "@/shared/ui";
import { RouteDriverProps } from "@/entidades/routeDriver";
import { CreateRouteDriverForm } from "@/features/routeDriver/create";

export const RouteDriverCreatePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Corridas"}
        description="Página de criação de corridas do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <CreateRouteDriverForm />
      </Box>
    </>
  );
};

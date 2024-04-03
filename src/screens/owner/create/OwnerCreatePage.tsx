"use client";
import { Box, Head } from "@/shared/ui";
import { OwnerProps } from "@/entidades/owner";
import { CreateOwnerForm } from "@/features/owner/create";

export const OwnerCreatePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Estabelecimentos"}
        description="Página de criação de estabelecimentos do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <CreateOwnerForm />
      </Box>
    </>
  );
};

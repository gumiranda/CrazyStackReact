"use client";
import { Box } from "@/shared/ui";
import { CreateMapRouteForm } from "@/slices/appointments/features/mapRoute/create";

export const MapRouteCreatePage = () => {
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <CreateMapRouteForm />
      </Box>
    </>
  );
};

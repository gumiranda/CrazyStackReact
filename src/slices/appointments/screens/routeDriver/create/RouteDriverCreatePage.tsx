"use client";
import { Box } from "@/shared/ui";
import { CreateRouteDriverForm } from "@/slices/appointments/features/routeDriver/create";

export const RouteDriverCreatePage = () => {
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <CreateRouteDriverForm />
      </Box>
    </>
  );
};

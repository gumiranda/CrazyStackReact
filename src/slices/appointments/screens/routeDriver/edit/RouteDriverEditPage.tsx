"use client";
import { Box, Head } from "@/shared/ui";
import { EditRouteDriverForm } from "@/slices/appointments/features/routeDriver/edit";
import { RouteDriverProps } from "@/slices/appointments/entidades/routeDriver";
type RouteDriverEditProps = {
  data: RouteDriverProps;
  id: string;
};
export const RouteDriverEditPage = ({ data, id }: RouteDriverEditProps) => {
  const props = { routeDriver: data };
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <EditRouteDriverForm {...props} />
      </Box>
    </>
  );
};

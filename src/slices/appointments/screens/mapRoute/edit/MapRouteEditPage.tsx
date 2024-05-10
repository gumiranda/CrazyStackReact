"use client";
import { Box, Head } from "@/shared/ui";
import { EditMapRouteForm } from "@/slices/appointments/features/mapRoute/edit";
import { MapRouteProps } from "@/slices/appointments/entidades/mapRoute";
type MapRouteEditProps = {
  data: MapRouteProps;
  id: string;
};
export const MapRouteEditPage = ({ data, id }: MapRouteEditProps) => {
  const props = { mapRoute: data };
  return (
    <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
      <EditMapRouteForm {...props} />
    </Box>
  );
};

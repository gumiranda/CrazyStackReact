"use client";
import { Box } from "@/shared/ui";
import { CreateAppointmentForm } from "@/slices/appointments/features/appointment/create";

export const AppointmentCreatePage = ({ data }) => {
  return (
    <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
      <CreateAppointmentForm data={data} />
    </Box>
  );
};

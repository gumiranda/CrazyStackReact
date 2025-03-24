"use client";
import { Box } from "@/shared/ui";
import { EditAppointmentForm } from "@/slices/appointments/features/appointment/edit";
import { AppointmentProps } from "@/slices/appointments/entidades/appointment";
type AppointmentEditProps = {
  data: AppointmentProps;
  id: string;
  owners: any;
};
export const AppointmentEditPage = ({ data, id, owners }: AppointmentEditProps) => {
  const props = { appointment: data, id, owners };
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <EditAppointmentForm {...props} />
      </Box>
    </>
  );
};

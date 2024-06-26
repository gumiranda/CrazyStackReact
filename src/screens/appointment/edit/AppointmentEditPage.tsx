"use client";
import { Box, Head } from "@/shared/ui";
import { EditAppointmentForm } from "@/features/appointment/edit";
import { AppointmentProps } from "@/entidades/appointment";
type AppointmentEditProps = {
  data: AppointmentProps;
  id: string;
  owners: any;
};
export const AppointmentEditPage = ({ data, id, owners }: AppointmentEditProps) => {
  const props = { appointment: data, id, owners };
  return (
    <>
      <Head
        title={"Belezix Admin | Agendamentos"}
        description="Página de edição de agendamentos do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <EditAppointmentForm {...props} />
      </Box>
    </>
  );
};

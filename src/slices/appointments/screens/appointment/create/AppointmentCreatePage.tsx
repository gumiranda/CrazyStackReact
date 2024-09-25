"use client";
import { Box, Head } from "@/shared/ui";
import { CreateAppointmentForm } from "@/slices/appointments/features/appointment/create";

export const AppointmentCreatePage = ({ data }) => {
  return (
    <>
      <Head
        title={"Belezix Admin | Agendamentos"}
        description="Página de criação de agendamentos do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <CreateAppointmentForm data={data} />
      </Box>
    </>
  );
};

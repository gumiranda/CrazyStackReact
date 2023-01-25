import { Box, Head } from "shared/ui";
import { AppointmentDetails } from "entidades/appointment/details";
import { AppointmentProps } from "entidades/appointment";
type AppointmentDetailsProps = {
  data: AppointmentProps;
  id: string;
};
export const AppointmentDetailsPage = ({ data }: AppointmentDetailsProps) => {
  const props = { appointment: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Agendamentos"}
        description="Página de detalhes de agendamentos do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <AppointmentDetails {...props} />
      </Box>
    </>
  );
};

import { whitelabel } from "@/application/whitelabel";
import { AppointmentGridPage } from "@/slices/appointments/screens/appointment/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Agendamentos`,
  description: `Página de listagem de agendamentos do ${whitelabel.systemName}. Aqui você pode ver as agendamentos em lista infinita.`,
};
export default AppointmentGridPage;

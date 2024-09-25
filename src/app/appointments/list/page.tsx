import { config } from "@/application/config";
import { AppointmentGridPage } from "@/slices/appointments/screens/appointment/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Agendamentos`,
  description: `Página de listagem de agendamentos do ${config.systemName}. Aqui você pode ver as agendamentos em lista infinita.`,
};
export default AppointmentGridPage;

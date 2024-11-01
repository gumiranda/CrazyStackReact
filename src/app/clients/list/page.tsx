import { whitelabel } from "@/application/whitelabel";
import { ClientGridPage } from "@/slices/appointments/screens/client/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Clientes`,
  description: `Página de listagem de clientes do ${whitelabel.systemName}. Aqui você pode ver as clientes em lista infinita.`,
};
export default ClientGridPage;

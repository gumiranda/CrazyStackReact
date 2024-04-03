import { config } from "@/application/config";
import { ClientGridPage } from "@/screens/client/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Clientes`,
  description: `Página de listagem de clientes do ${config.systemName}. Aqui você pode ver as clientes em lista infinita.`,
};
export default ClientGridPage;

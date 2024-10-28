import { config } from "@/application/config";
import { RequestGridPage } from "@/slices/appointments/screens/request/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Solicitações`,
  description: `Página de listagem de solicitações do ${config.systemName}. Aqui você pode ver as solicitações em lista infinita.`,
};
export default RequestGridPage;

import { config } from "@/application/config";
import { ServiceGridPage } from "@/screens/service/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Serviços`,
  description: `Página de listagem de serviços do ${config.systemName}. Aqui você pode ver as serviços em lista infinita.`,
};
export default ServiceGridPage;

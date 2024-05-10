import { config } from "@/application/config";
import { RouteDriverGridPage } from "@/slices/appointments/screens/routeDriver/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Corridas`,
  description: `Página de listagem de corridas do ${config.systemName}. Aqui você pode ver as corridas em lista infinita.`,
};
export default RouteDriverGridPage;

import { whitelabel } from "@/application/whitelabel";
import { RouteDriverGridPage } from "@/slices/appointments/screens/routeDriver/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Corridas`,
  description: `Página de listagem de corridas do ${whitelabel.systemName}. Aqui você pode ver as corridas em lista infinita.`,
};
export default RouteDriverGridPage;

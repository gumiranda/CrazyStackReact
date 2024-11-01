import { whitelabel } from "@/application/whitelabel";
import { MapRouteGridPage } from "@/slices/appointments/screens/mapRoute/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Rotas`,
  description: `Página de listagem de rotas do ${whitelabel.systemName}. Aqui você pode ver as rotas em lista infinita.`,
};
export default MapRouteGridPage;

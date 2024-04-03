import { config } from "@/application/config";
import { MapRouteGridPage } from "@/screens/mapRoute/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Rotas`,
  description: `Página de listagem de rotas do ${config.systemName}. Aqui você pode ver as rotas em lista infinita.`,
};
export default MapRouteGridPage;

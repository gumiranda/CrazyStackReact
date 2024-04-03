import { config } from "@/application/config";
import { MapRouteCreatePage } from "@/screens/mapRoute/create";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Criar Rota`,
  description: `Página de criação de rotas do ${config.systemName}. Aqui você pode criar rota.`,
};
export default MapRouteCreatePage;

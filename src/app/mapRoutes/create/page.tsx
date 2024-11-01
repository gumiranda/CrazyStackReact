import { whitelabel } from "@/application/whitelabel";
import { MapRouteCreatePage } from "@/slices/appointments/screens/mapRoute/create";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Criar Rota`,
  description: `Página de criação de rotas do ${whitelabel.systemName}. Aqui você pode criar rota.`,
};
export default MapRouteCreatePage;

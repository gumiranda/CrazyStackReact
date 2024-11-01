import { whitelabel } from "@/application/whitelabel";
import { ServiceGridPage } from "@/slices/appointments/screens/service/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Serviços`,
  description: `Página de listagem de serviços do ${whitelabel.systemName}. Aqui você pode ver as serviços em lista infinita.`,
};
export default ServiceGridPage;

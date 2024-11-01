import { whitelabel } from "@/application/whitelabel";
import { OwnerGridPage } from "@/slices/appointments/screens/owner/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Estabelecimentos`,
  description: `Página de listagem de estabelecimentos do ${whitelabel.systemName}. Aqui você pode ver as estabelecimentos em lista infinita.`,
};
export default OwnerGridPage;

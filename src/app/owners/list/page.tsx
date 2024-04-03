import { config } from "@/application/config";
import { OwnerGridPage } from "@/screens/owner/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Estabelecimentos`,
  description: `Página de listagem de estabelecimentos do ${config.systemName}. Aqui você pode ver as estabelecimentos em lista infinita.`,
};
export default OwnerGridPage;

import { config } from "@/application/config";
import { Layout } from "@/shared/ui/templates/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Estabelecimentos`,
  description: `Página de listagem de estabelecimentos do ${config.systemName}. Aqui você pode criar, editar e excluir estabelecimentos.`,
};

export default function LayoutAuthenticated({ children }) {
  return <Layout>{children}</Layout>;
}

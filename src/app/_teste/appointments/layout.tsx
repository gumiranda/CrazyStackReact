import { config } from "@/application/config";
import { Layout } from "@/shared/ui/templates/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Agendamentos`,
  description: `Página de listagem de agendamentos do ${config.systemName}. Aqui você pode criar, editar e excluir agendamentos.`,
};

export default function LayoutAuthenticated({ children }) {
  return <Layout>{children}</Layout>;
}

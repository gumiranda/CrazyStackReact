import { config } from "@/application/config";
import { Layout } from "@/shared/ui/templates/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Profissionals`,
  description: `Página de listagem de profissionals do ${config.systemName}. Aqui você pode criar, editar e excluir profissionals.`,
};

export default function LayoutAuthenticated({ children }) {
  return <Layout>{children}</Layout>;
}

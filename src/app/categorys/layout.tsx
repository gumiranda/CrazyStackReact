import { config } from "@/application/config";
import { Layout } from "@/shared/ui/templates/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Categorias`,
  description: `Página de listagem de categorias do ${config.systemName}. Aqui você pode criar, editar e excluir categorias.`,
};

export default function LayoutAuthenticated({ children }) {
  return <Layout>{children}</Layout>;
}

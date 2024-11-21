import { whitelabel } from "@/application/whitelabel";
import { Layout } from "@/shared/ui/templates/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Categorias`,
  description: `Página de listagem de categorias do ${whitelabel.systemName}. Aqui você pode criar, editar e excluir categorias.`,
};

export default function LayoutAuthenticated({ children }) {
  return <Layout>{children}</Layout>;
}

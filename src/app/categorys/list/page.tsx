import { whitelabel } from "@/application/whitelabel";
import { CategoryGridPage } from "@/slices/appointments/screens/category/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Categorias`,
  description: `Página de listagem de categorias do ${whitelabel.systemName}. Aqui você pode ver as categorias em lista infinita.`,
};
export default CategoryGridPage;

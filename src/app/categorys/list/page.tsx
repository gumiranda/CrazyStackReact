import { config } from "@/application/config";
import { CategoryGridPage } from "@/slices/appointments/screens/category/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Categorias`,
  description: `Página de listagem de categorias do ${config.systemName}. Aqui você pode ver as categorias em lista infinita.`,
};
export default CategoryGridPage;

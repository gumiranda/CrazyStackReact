import { config } from "@/application/config";
import { CategoryCreatePage } from "@/slices/appointments/screens/category/create";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${config.systemName} | Criar Categoria`,
  description: `Página de criação de categorias do ${config.systemName}. Aqui você pode criar uma nova categoria.`,
};
export default CategoryCreatePage;

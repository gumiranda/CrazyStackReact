import { whitelabel } from "@/application/whitelabel";
import { CategoryCreatePage } from "@/slices/appointments/screens/category/create";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Criar Categoria`,
  description: `Página de criação de categorias do ${whitelabel.systemName}. Aqui você pode criar uma nova categoria.`,
};
export default CategoryCreatePage;

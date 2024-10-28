import { getCategoryById } from "@/slices/appointments/entidades/category/category.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { CategoryEditPage } from "@/slices/appointments/screens/category/edit";

export const metadata: Metadata = {
  title: `${config.systemName} | Editar Categoria`,
  description: `Página de edição de categorias do ${config.systemName}. Aqui você pode editar uma categoria.`,
};

async function getData(id) {
  const allCookies = getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const res = await getCategoryById(id, parsedCookies);
  if (!res) {
    return null;
  }
  return res;
}
export default async function Page({ params: { id } }: { params: { id: string } }) {
  const data = await getData(id);
  if (!data) {
    redirect("/login");
  }
  return <CategoryEditPage data={data} id={id} />;
}

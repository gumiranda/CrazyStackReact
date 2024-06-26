import { getCategoryById } from "@/entidades/category/category.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { CategoryDetailsPage } from "@/screens/category/details";
import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${config.systemName} | Detalhes da Categoria`,
  description: `Página de detalhes de categorias do ${config.systemName}. Aqui você pode ver os detalhes de uma categoria.`,
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
  return <CategoryDetailsPage data={data} id={id} />;
}

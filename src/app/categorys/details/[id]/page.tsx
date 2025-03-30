import { getCategoryById } from "@/slices/appointments/entidades/category/category.api";
import { parseCookies } from "@/shared/libs/utils";
import { getCookies } from "@/shared/libs/cookies";

export const revalidate = 3000;

import { CategoryDetailsPage } from "@/slices/appointments/screens/category/details";
import { whitelabel } from "@/application/whitelabel";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Detalhes da Categoria`,
  description: `Página de detalhes de categorias do ${whitelabel.systemName}. Aqui você pode ver os detalhes de uma categoria.`,
};

async function getData(id) {
  const allCookies = await getCookies();
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
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const data = await getData(id);
  if (!data) {
    redirect("/login");
  }
  return <CategoryDetailsPage data={data} id={id} />;
}

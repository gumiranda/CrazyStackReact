import { getCategoryById } from "@/slices/appointments/entidades/category/category.api";
import { parseCookies } from "@/shared/libs/utils";
import { getCookies } from "@/shared/libs/cookies";

export const revalidate = 3000;

import { whitelabel } from "@/application/whitelabel";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { CategoryEditPage } from "@/slices/appointments/screens/category/edit";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Editar Categoria`,
  description: `Página de edição de categorias do ${whitelabel.systemName}. Aqui você pode editar uma categoria.`,
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
  return <CategoryEditPage data={data} id={id} />;
}

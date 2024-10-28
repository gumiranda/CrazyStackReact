import { getServiceById } from "@/slices/appointments/entidades/service/service.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ServiceEditPage } from "@/slices/appointments/screens/service/edit";
import { getCategorys } from "@/slices/appointments/entidades/category/category.api";

export const metadata: Metadata = {
  title: `${config.systemName} | Editar Serviço`,
  description: `Página de edição de serviços do ${config.systemName}. Aqui você pode editar serviço.`,
};

async function getData(id) {
  const allCookies = await getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const [categorys, data] = await Promise.all([
    getCategorys(1, parseCookies(allCookies), {}),
    getServiceById(id, parsedCookies),
  ]);
  if (!data || !categorys) {
    return null;
  }
  return { data, categorys };
}
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const { data, categorys } = (await getData(id)) || {};
  if (!data || !categorys) {
    redirect("/login");
  }
  return <ServiceEditPage data={data} id={id} categorys={categorys} />;
}

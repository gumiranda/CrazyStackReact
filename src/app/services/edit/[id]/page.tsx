import { getServiceById } from "@/entidades/service/service.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ServiceEditPage } from "@/screens/service/edit";
import { getCategorys } from "@/entidades/category/category.api";
import LayoutPayAuthenticated from "@/shared/libs/utils/layoutPayAsync";

export const metadata: Metadata = {
  title: `${config.systemName} | Editar Serviço`,
  description: `Página de edição de serviços do ${config.systemName}. Aqui você pode editar serviço.`,
};

async function getData(id) {
  const allCookies = getCookies();
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
export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { data, categorys } = (await getData(id)) || {};
  if (!data || !categorys) {
    redirect("/login");
  }
  return (
    <LayoutPayAuthenticated>
      <ServiceEditPage data={data} id={id} categorys={categorys} />
    </LayoutPayAuthenticated>
  );
}

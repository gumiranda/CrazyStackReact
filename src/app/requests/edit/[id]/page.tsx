import { getRequestById } from "@/slices/appointments/entidades/request/request.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { RequestEditPage } from "@/slices/appointments/screens/request/edit";
import { getOwners } from "@/slices/appointments/entidades/owner/owner.api";

export const metadata: Metadata = {
  title: `${config.systemName} | Editar Solicitacoes`,
  description: `Página de edição de solicitações do ${config.systemName}. Aqui você pode editar solicitacoes.`,
};

async function getData(id) {
  const allCookies = getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const [owners, data] = await Promise.all([
    getOwners(1, parseCookies(allCookies), {}),
    getRequestById(id, parsedCookies),
  ]);
  if (!data || !owners) {
    return null;
  }
  return { data, owners };
}
export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { data, owners } = (await getData(id)) || {};
  if (!data || !owners) {
    redirect("/login");
  }
  return <RequestEditPage data={data} owners={owners} />;
}

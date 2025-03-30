import { getRequestById } from "@/slices/appointments/entidades/request/request.api";
import { parseCookies } from "@/shared/libs/utils";
import { getCookies } from "@/shared/libs/cookies";
export const revalidate = 3000;

import { whitelabel } from "@/application/whitelabel";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { RequestEditPage } from "@/slices/appointments/screens/request/edit";
import { getOwners } from "@/slices/appointments/entidades/owner/owner.api";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Editar Solicitacoes`,
  description: `Página de edição de solicitações do ${whitelabel.systemName}. Aqui você pode editar solicitacoes.`,
};

async function getData(id) {
  const allCookies = await getCookies();
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
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const { data, owners } = (await getData(id)) || {};
  if (!data || !owners) {
    redirect("/login");
  }
  return <RequestEditPage data={data} owners={owners} />;
}

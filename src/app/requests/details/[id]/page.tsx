import { getRequestById } from "@/entidades/request/request.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { RequestDetailsPage } from "@/screens/request/details";
import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${config.systemName} | Detalhes da Solicitacoes`,
  description: `Página de detalhes de solicitações do ${config.systemName}. Aqui você pode ver os detalhes de solicitacoes.`,
};

async function getData(id) {
  const allCookies = getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const res = await getRequestById(id, parsedCookies);
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
  return <RequestDetailsPage data={data} id={id} />;
}

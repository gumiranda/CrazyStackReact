import { config } from "@/application/config";
import { RequestCreatePage } from "@/screens/request/create";
import type { Metadata } from "next";
import { getOwners } from "@/entidades/owner/owner.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = getCookies();
  if (!allCookies) return null;
  const res = await getOwners(pageNumber, parseCookies(allCookies), {});
  if (!res) {
    return null;
  }
  return res;
}
export const metadata: Metadata = {
  title: `${config.systemName} | Criar Solicitacoes`,
  description: `Página de criação de solicitações do ${config.systemName}. Aqui você pode criar solicitacoes.`,
};

export default async function Page() {
  const data = await getData(1);
  if (!data) return null;
  return <RequestCreatePage owners={data} />;
}

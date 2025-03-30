import { whitelabel } from "@/application/whitelabel";
import { RequestCreatePage } from "@/slices/appointments/screens/request/create";
import type { Metadata } from "next";
import { getOwners } from "@/slices/appointments/entidades/owner/owner.api";
import { parseCookies } from "@/shared/libs/utils";
import { getCookies } from "@/shared/libs/cookies";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = await getCookies();
  if (!allCookies) return null;
  const res = await getOwners(pageNumber, parseCookies(allCookies), {});
  if (!res) {
    return null;
  }
  return res;
}
export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Criar Solicitacoes`,
  description: `Página de criação de solicitações do ${whitelabel.systemName}. Aqui você pode criar solicitacoes.`,
};

export default async function Page() {
  const data = await getData(1);
  if (!data) return null;
  return <RequestCreatePage owners={data} />;
}

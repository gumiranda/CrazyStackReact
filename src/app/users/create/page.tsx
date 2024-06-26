import { config } from "@/application/config";
import { UserCreatePage } from "@/screens/user/create";
import type { Metadata } from "next";
import { getServices } from "@/entidades/service/service.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import { getOwners } from "@/entidades/owner";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = getCookies();
  if (!allCookies) return null;
  const [data, owner] = await Promise.all([
    getServices(pageNumber, parseCookies(allCookies), {}),
    getOwners(pageNumber, parseCookies(allCookies), {}),
  ]);
  if (!data || !owner) {
    return null;
  }
  return { data, owner };
}
export const metadata: Metadata = {
  title: `${config.systemName} | Criar Profissional`,
  description: `Página de criação de profissionals do ${config.systemName}. Aqui você pode criar profissional.`,
};

export default async function Page() {
  const data = await getData(1);
  if (!data) return null;
  return <UserCreatePage data={data?.data} owner={data?.owner} />;
}

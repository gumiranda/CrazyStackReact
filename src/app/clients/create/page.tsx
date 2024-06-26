import { config } from "@/application/config";
import { ClientCreatePage } from "@/screens/client/create";
import type { Metadata } from "next";
import { getUsers } from "@/entidades/user/user.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = getCookies();
  if (!allCookies) return null;
  const res = await getUsers(pageNumber, parseCookies(allCookies), {});
  if (!res) {
    return null;
  }
  return res;
}
export const metadata: Metadata = {
  title: `${config.systemName} | Criar Cliente`,
  description: `Página de criação de clientes do ${config.systemName}. Aqui você pode criar cliente.`,
};

export default async function Page() {
  const data = await getData(1);
  if (!data) return null;
  return <ClientCreatePage users={data} />;
}

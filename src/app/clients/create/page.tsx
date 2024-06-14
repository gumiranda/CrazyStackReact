import { config } from "@/application/config";
import { ClientCreatePage } from "@/slices/appointments/screens/client/create";
import type { Metadata } from "next";
import { getUsers } from "@/slices/general/entidades/user/user.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import { getOwners } from "@/slices/appointments/entidades/owner";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = getCookies();
  if (!allCookies) return null;
  const [owners, users] = await Promise.all([
    getOwners(1, parseCookies(allCookies), {}),
    getUsers(pageNumber, parseCookies(allCookies), {}),
  ]);

  if (!users || !owners) {
    return null;
  }
  return { users, owners };
}
export const metadata: Metadata = {
  title: `${config.systemName} | Criar Cliente`,
  description: `Página de criação de clientes do ${config.systemName}. Aqui você pode criar cliente.`,
};

export default async function Page() {
  const data = await getData(1);
  if (!data) return null;
  const { users, owners } = data;
  if (!users || !owners) return null;
  return <ClientCreatePage users={users} owners={owners} />;
}

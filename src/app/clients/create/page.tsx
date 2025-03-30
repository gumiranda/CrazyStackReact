import { whitelabel } from "@/application/whitelabel";
import { ClientCreatePage } from "@/slices/appointments/screens/client/create";
import type { Metadata } from "next";
import { getUsers } from "@/slices/general/entidades/user/user.api";
import { parseCookies } from "@/shared/libs/utils";
import { getOwners } from "@/slices/appointments/entidades/owner";
import { getCookies } from "@/shared/libs/cookies";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = await getCookies();
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
  title: `${whitelabel.systemName} | Criar Cliente`,
  description: `Página de criação de clientes do ${whitelabel.systemName}. Aqui você pode criar cliente.`,
};

export default async function Page() {
  const data = await getData(1);
  if (!data) return null;
  const { users, owners } = data;
  if (!users || !owners) return null;
  return <ClientCreatePage users={users} owners={owners} />;
}

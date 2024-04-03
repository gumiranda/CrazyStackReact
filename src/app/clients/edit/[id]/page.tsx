import { getClientById } from "@/entidades/client/client.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ClientEditPage } from "@/screens/client/edit";
import { getUsers } from "@/entidades/user/user.api";

export const metadata: Metadata = {
  title: `${config.systemName} | Editar Cliente`,
  description: `Página de edição de clientes do ${config.systemName}. Aqui você pode editar cliente.`,
};

async function getData(id) {
  const allCookies = getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const [users, data] = await Promise.all([
    getUsers(1, parseCookies(allCookies), {}),
    getClientById(id, parsedCookies),
  ]);
  if (!data || !users) {
    return null;
  }
  return { data, users };
}
export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { data, users } = (await getData(id)) || {};
  if (!data || !users) {
    redirect("/login");
  }
  return <ClientEditPage data={data} id={id} users={users} />;
}

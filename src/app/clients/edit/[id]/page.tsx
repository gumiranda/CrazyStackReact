import { getClientById } from "@/slices/appointments/entidades/client/client.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { whitelabel } from "@/application/whitelabel";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ClientEditPage } from "@/slices/appointments/screens/client/edit";
import { getUsers } from "@/slices/general/entidades/user/user.api";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Editar Cliente`,
  description: `Página de edição de clientes do ${whitelabel.systemName}. Aqui você pode editar cliente.`,
};

async function getData(id) {
  const allCookies = await getCookies();
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
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const { data, users } = (await getData(id)) || {};
  if (!data || !users) {
    redirect("/login");
  }
  return <ClientEditPage data={data} id={id} users={users} />;
}

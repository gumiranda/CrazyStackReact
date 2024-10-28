import { getOwnerById } from "@/slices/appointments/entidades/owner/owner.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { OwnerEditPage } from "@/slices/appointments/screens/owner/edit";
import { getUsers } from "@/slices/general/entidades/user/user.api";

export const metadata: Metadata = {
  title: `${config.systemName} | Editar Estabelecimento`,
  description: `Página de edição de estabelecimentos do ${config.systemName}. Aqui você pode editar estabelecimento.`,
};

async function getData(id) {
  const allCookies = await getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const [users, data] = await Promise.all([
    getUsers(1, parseCookies(allCookies), {}),
    getOwnerById(id, parsedCookies),
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
  return <OwnerEditPage data={data} id={id} users={users} />;
}

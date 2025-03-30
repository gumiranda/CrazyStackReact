import { getUserById } from "@/slices/general/entidades/user/user.api";
import { parseCookies } from "@/shared/libs/utils";
import { getCookies } from "@/shared/libs/cookies";
export const revalidate = 3000;

import { whitelabel } from "@/application/whitelabel";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { UserEditPage } from "@/slices/general/screens/user/edit";
import { getServices } from "@/slices/appointments/entidades/service/service.api";
import { getOwners } from "@/slices/appointments/entidades/owner";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Editar Profissional`,
  description: `Página de edição de profissionals do ${whitelabel.systemName}. Aqui você pode editar profissional.`,
};

async function getData(id) {
  const allCookies = await getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const [services, owners, data] = await Promise.all([
    getServices(1, parseCookies(allCookies), {}),
    getOwners(1, parseCookies(allCookies), {}),
    getUserById(id, parsedCookies),
  ]);
  if (!data || !services || !owners) {
    return null;
  }
  return { data, services, owners };
}
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const { data, services, owners } = (await getData(id)) || {};
  if (!data || !services || !owners) {
    redirect("/login");
  }
  return <UserEditPage data={data} id={id} service={services} owner={owners} />;
}

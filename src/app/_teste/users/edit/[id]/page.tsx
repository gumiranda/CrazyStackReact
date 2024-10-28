import { getUserById } from "@/slices/general/entidades/user/user.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { UserEditPage } from "@/slices/general/screens/user/edit";
import { getServices } from "@/slices/appointments/entidades/service/service.api";
import { getOwners } from "@/slices/appointments/entidades/owner";

export const metadata: Metadata = {
  title: `${config.systemName} | Editar Profissional`,
  description: `Página de edição de profissionals do ${config.systemName}. Aqui você pode editar profissional.`,
};

async function getData(id) {
  const allCookies = getCookies();
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
export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { data, services, owners } = (await getData(id)) || {};
  if (!data || !services || !owners) {
    redirect("/login");
  }
  return <UserEditPage data={data} id={id} service={services} owner={owners} />;
}

import { getRouteDriverById } from "@/slices/appointments/entidades/routeDriver/routeDriver.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { RouteDriverEditPage } from "@/slices/appointments/screens/routeDriver/edit";

export const metadata: Metadata = {
  title: `${config.systemName} | Editar Corrida`,
  description: `Página de edição de corridas do ${config.systemName}. Aqui você pode editar corrida.`,
};

async function getData(id) {
  const allCookies = await getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const data = await getRouteDriverById(id, parsedCookies);
  if (!data) {
    return null;
  }
  return { data };
}
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const { data } = (await getData(id)) || {};
  if (!data) {
    redirect("/login");
  }
  return <RouteDriverEditPage data={data} id={id} />;
}

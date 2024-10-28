import { getMapRouteById } from "@/slices/appointments/entidades/mapRoute/mapRoute.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { MapRouteEditPage } from "@/slices/appointments/screens/mapRoute/edit";

export const metadata: Metadata = {
  title: `${config.systemName} | Editar Rota`,
  description: `Página de edição de rotas do ${config.systemName}. Aqui você pode editar rota.`,
};

async function getData(id) {
  const allCookies = getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const res = await getMapRouteById(id, parsedCookies);
  if (!res) {
    return null;
  }
  return res;
}
export default async function Page({ params: { id } }: { params: { id: string } }) {
  const data = await getData(id);
  if (!data) {
    redirect("/login");
  }
  return <MapRouteEditPage data={data} id={id} />;
}

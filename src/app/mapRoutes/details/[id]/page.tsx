import { getMapRouteById } from "@/slices/appointments/entidades/mapRoute/mapRoute.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { MapRouteDetailsPage } from "@/slices/appointments/screens/mapRoute/details";
import { whitelabel } from "@/application/whitelabel";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Detalhes da Rota`,
  description: `Página de detalhes de rotas do ${whitelabel.systemName}. Aqui você pode ver os detalhes de rota.`,
};

async function getData(id) {
  const allCookies = await getCookies();
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
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const data = await getData(id);
  if (!data) {
    redirect("/login");
  }
  return <MapRouteDetailsPage data={data} id={id} />;
}

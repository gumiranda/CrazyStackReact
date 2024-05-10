import { getMapRouteById } from "@/slices/appointments/entidades/mapRoute/mapRoute.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { MapRouteDetailsPage } from "@/slices/appointments/screens/mapRoute/details";
import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import LayoutPayAuthenticated from "@/shared/libs/utils/layoutPayAsync";

export const metadata: Metadata = {
  title: `${config.systemName} | Detalhes da Rota`,
  description: `Página de detalhes de rotas do ${config.systemName}. Aqui você pode ver os detalhes de rota.`,
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
  return (
    <LayoutPayAuthenticated>
      <MapRouteDetailsPage data={data} id={id} />
    </LayoutPayAuthenticated>
  );
}

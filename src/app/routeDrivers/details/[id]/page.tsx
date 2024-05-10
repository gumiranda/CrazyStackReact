import { getRouteDriverById } from "@/slices/appointments/entidades/routeDriver/routeDriver.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { RouteDriverDetailsPage } from "@/slices/appointments/screens/routeDriver/details";
import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMapRouteById } from "@/slices/appointments/entidades/mapRoute/mapRoute.api";
import LayoutPayAuthenticated from "@/shared/libs/utils/layoutPayAsync";

export const metadata: Metadata = {
  title: `${config.systemName} | Detalhes da Corrida`,
  description: `Página de detalhes de corridas do ${config.systemName}. Aqui você pode ver os detalhes de corrida.`,
};

async function getData(id) {
  const allCookies = getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const data = await getRouteDriverById(id, parsedCookies);
  if (!data) {
    return null;
  }
  if (data?.routeId) {
    const mapRoute = await getMapRouteById(data?.routeId, parsedCookies);
    return {
      props: {
        data,
        id,
        mapRoute,
      },
    };
  }

  return {
    props: {
      data,
    },
  };
}
export default async function Page({ params: { id } }: { params: { id: string } }) {
  const data = await getData(id);
  if (!data?.props?.mapRoute) {
    redirect("/login");
  }
  return (
    <LayoutPayAuthenticated>
      <RouteDriverDetailsPage
        data={data?.props?.data}
        mapRoute={data?.props?.mapRoute}
        id={id}
      />
    </LayoutPayAuthenticated>
  );
}

import { getServiceById } from "@/slices/appointments/entidades/service/service.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { ServiceDetailsPage } from "@/slices/appointments/screens/service/details";
import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import LayoutPayAuthenticated from "@/shared/libs/utils/layoutPayAsync";

export const metadata: Metadata = {
  title: `${config.systemName} | Detalhes da Serviço`,
  description: `Página de detalhes de serviços do ${config.systemName}. Aqui você pode ver os detalhes de serviço.`,
};

async function getData(id) {
  const allCookies = getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const res = await getServiceById(id, parsedCookies);
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
      <ServiceDetailsPage data={data} id={id} />
    </LayoutPayAuthenticated>
  );
}

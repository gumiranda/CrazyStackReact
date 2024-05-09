import { getClientById } from "@/entidades/client/client.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { ClientDetailsPage } from "@/screens/client/details";
import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import LayoutPayAuthenticated from "@/shared/libs/utils/layoutPayAsync";

export const metadata: Metadata = {
  title: `${config.systemName} | Detalhes da Cliente`,
  description: `Página de detalhes de clientes do ${config.systemName}. Aqui você pode ver os detalhes de cliente.`,
};

async function getData(id) {
  const allCookies = getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const res = await getClientById(id, parsedCookies);
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
      <ClientDetailsPage data={data} id={id} />
    </LayoutPayAuthenticated>
  );
}

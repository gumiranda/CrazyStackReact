import { getClientById } from "@/slices/appointments/entidades/client/client.api";
import { parseCookies } from "@/shared/libs/utils";
import { getCookies } from "@/shared/libs/cookies";

export const revalidate = 3000;

import { ClientDetailsPage } from "@/slices/appointments/screens/client/details";
import { whitelabel } from "@/application/whitelabel";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Detalhes da Cliente`,
  description: `Página de detalhes de clientes do ${whitelabel.systemName}. Aqui você pode ver os detalhes de cliente.`,
};

async function getData(id) {
  const allCookies = await getCookies();
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
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const data = await getData(id);
  if (!data) {
    redirect("/login");
  }
  return <ClientDetailsPage data={data} id={id} />;
}

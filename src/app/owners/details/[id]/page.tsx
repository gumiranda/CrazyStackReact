import { getOwnerById } from "@/slices/appointments/entidades/owner/owner.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { OwnerDetailsPage } from "@/slices/appointments/screens/owner/details";
import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${config.systemName} | Detalhes da Estabelecimento`,
  description: `Página de detalhes de estabelecimentos do ${config.systemName}. Aqui você pode ver os detalhes de estabelecimento.`,
};

async function getData(id) {
  const allCookies = await getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const res = await getOwnerById(id, parsedCookies);
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
  return <OwnerDetailsPage data={data} id={id} />;
}

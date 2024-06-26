import { getUserById } from "@/entidades/user/user.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { UserDetailsPage } from "@/screens/user/details";
import { config } from "@/application/config";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${config.systemName} | Detalhes da Profissional`,
  description: `Página de detalhes de profissionals do ${config.systemName}. Aqui você pode ver os detalhes de profissional.`,
};

async function getData(id) {
  const allCookies = getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const res = await getUserById(id, parsedCookies);
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
  return <UserDetailsPage canDelete={false} data={data} id={id} />;
}

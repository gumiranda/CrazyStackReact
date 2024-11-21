import { getUserById } from "@/slices/general/entidades/user/user.api";
import { getCookies, parseCookies } from "@/shared/libs/utils";
export const revalidate = 3000;

import { UserDetailsPage } from "@/slices/general/screens/user/details";
import { whitelabel } from "@/application/whitelabel";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Detalhes da Profissional`,
  description: `Página de detalhes de profissionals do ${whitelabel.systemName}. Aqui você pode ver os detalhes de profissional.`,
};

async function getData(id) {
  const allCookies = await getCookies();
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
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const data = await getData(id);
  if (!data) {
    redirect("/login");
  }
  return <UserDetailsPage canDelete={true} data={data} id={id} />;
}

import { config } from "@/application/config";
import { OwnerCreatePage } from "@/screens/owner/create";
import type { Metadata } from "next";
import { getUsers } from "@/entidades/user/user.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import LayoutPayAuthenticated from "@/shared/libs/utils/layoutPayAsync";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = getCookies();
  if (!allCookies) return null;
  const res = await getUsers(pageNumber, parseCookies(allCookies), {});
  if (!res) {
    return null;
  }
  return res;
}
export const metadata: Metadata = {
  title: `${config.systemName} | Criar Estabelecimento`,
  description: `Página de criação de estabelecimentos do ${config.systemName}. Aqui você pode criar estabelecimento.`,
};

export default async function Page() {
  const data = await getData(1);
  if (!data) return null;
  return (
    <LayoutPayAuthenticated>
      <OwnerCreatePage data={data} />
    </LayoutPayAuthenticated>
  );
}

import { config } from "@/application/config";
import { ServiceCreatePage } from "@/screens/service/create";
import type { Metadata } from "next";
import { getCategorys } from "@/entidades/category/category.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import LayoutPayAuthenticated from "@/shared/libs/utils/layoutPayAsync";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = getCookies();
  if (!allCookies) return null;
  const res = await getCategorys(pageNumber, parseCookies(allCookies), {});
  if (!res) {
    return null;
  }
  return res;
}
export const metadata: Metadata = {
  title: `${config.systemName} | Criar Serviço`,
  description: `Página de criação de serviços do ${config.systemName}. Aqui você pode criar serviço.`,
};

export default async function Page() {
  const data = await getData(1);
  if (!data) return null;
  return (
    <LayoutPayAuthenticated>
      <ServiceCreatePage data={data} />
    </LayoutPayAuthenticated>
  );
}

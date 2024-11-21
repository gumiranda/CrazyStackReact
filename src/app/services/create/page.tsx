import { whitelabel } from "@/application/whitelabel";
import { ServiceCreatePage } from "@/slices/appointments/screens/service/create";
import type { Metadata } from "next";
import { getCategorys } from "@/slices/appointments/entidades/category/category.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = await getCookies();
  if (!allCookies) return null;
  const res = await getCategorys(pageNumber, parseCookies(allCookies), {});
  if (!res) {
    return null;
  }
  return res;
}
export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Criar Serviço`,
  description: `Página de criação de serviços do ${whitelabel.systemName}. Aqui você pode criar serviço.`,
};

export default async function Page() {
  const data = await getData(1);
  if (!data) return null;
  return <ServiceCreatePage data={data} />;
}

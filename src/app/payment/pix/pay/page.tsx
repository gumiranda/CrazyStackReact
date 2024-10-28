import { config } from "@/application/config";
import { PayPixPage } from "@/slices/general/screens/payment/pix/PayPixPage";
import { getCookies, parseCookies } from "@/shared/libs/utils";
import { parseJSON } from "@/shared/libs/utils/parseJSON";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${config.systemName} | Minha assinatura`,
  description: `Preencha os seus dados pessoais para garantir a assinatura do ${config.systemName}.`,
};
export const revalidate = 3000;
async function getData() {
  const allCookies = await getCookies();
  if (!allCookies) return null;
  const cookies: any = parseCookies(allCookies);
  const { "belezixadmin.user": userComingFromCookie } = cookies;
  const parsedUser = parseJSON(userComingFromCookie);
  return parsedUser;
}

export default async function Page() {
  const data = await getData();
  if (!data) {
    redirect("/home");
  }
  return <PayPixPage user={data} />;
}

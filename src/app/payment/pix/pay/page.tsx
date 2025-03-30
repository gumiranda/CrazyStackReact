import { whitelabel } from "@/application/whitelabel";
import { PayPixPage } from "@/slices/general/screens/payment/pix/PayPixPage";
import { parseCookies } from "@/shared/libs/utils";
import { getCookies } from "@/shared/libs/cookies";
import { parseJSON } from "@/shared/libs/utils/parseJSON";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Minha assinatura`,
  description: `Preencha os seus dados pessoais para garantir a assinatura do ${whitelabel.systemName}.`,
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

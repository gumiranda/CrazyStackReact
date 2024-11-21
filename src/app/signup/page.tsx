import { SignUpPage } from "@/slices/general/screens/auth/signup/SignUpPage";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Cadastrar`,
  description: `Cadastre-se no ${whitelabel.systemName} para acessar o sistema.`,
};

async function getData() {
  const cookies = await getCookies();
  if (!cookies) {
    return null;
  }
  const cookiesParsed = parseCookies(cookies);
  return cookiesParsed;
}
export default async function Page() {
  const data = await getData();
  if (data?.["belezixadmin.token"]) {
    redirect("/home");
  }
  return <SignUpPage />;
}

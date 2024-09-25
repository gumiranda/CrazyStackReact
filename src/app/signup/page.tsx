import { SignUpPage } from "@/slices/general/screens/auth/signup/SignUpPage";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { config } from "@/application/config";

export const metadata: Metadata = {
  title: `${config.systemName} | Cadastrar`,
  description: `Cadastre-se no ${config.systemName} para acessar o sistema.`,
};

async function getData() {
  const cookies = getCookies();
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

import { SignUpPage } from "@/screens/auth/signup/SignUpPage";
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
  const cookiesParsed = parseCookies(cookies);
  if (cookiesParsed["belezixadmin.token"]) {
    return null;
  }
  return cookiesParsed;
}
export default async function Page() {
  const data = await getData();
  if (data) {
    redirect("/home");
  }
  return <SignUpPage />;
}

import { SignUpPage } from "@/slices/general/screens/auth/signup/SignUpPage";
import { parseCookies } from "@/shared/libs/utils";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Cadastrar`,
  description: `Cadastre-se no ${whitelabel.systemName} para acessar o sistema.`,
};

async function getData() {
  const allCookies = (await cookies()).getAll();
  if (!allCookies) {
    return null;
  }
  const cookiesData = parseCookies(allCookies);
  if (!cookiesData) {
    return null;
  }
  return cookiesData;
}
export default async function Page() {
  const data = await getData();
  if (data?.["belezixadmin.token"]) {
    redirect("/home");
  }
  return <SignUpPage />;
}

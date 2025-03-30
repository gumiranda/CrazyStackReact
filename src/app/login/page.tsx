import { Login } from "@/slices/general/screens/auth/login/LoginPage";
import { parseCookies } from "@/shared/libs/utils/parseCookies";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Agendamentos`,
  description: "Agende seu horário com os melhores barbeiros da cidade",
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
  const cookiesData = await getData();
  if (cookiesData?.["belezixadmin.token"]) {
    redirect("/home");
  }
  return <Login />;
}

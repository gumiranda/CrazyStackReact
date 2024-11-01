import { Login } from "@/slices/general/screens/auth/login/LoginPage";
import { parseCookies } from "@/shared/libs/utils/parseCookies";
import { getCookies } from "@/shared/libs/utils/cookies";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Agendamentos`,
  description: "Agende seu horário com os melhores barbeiros da cidade",
};
async function getData() {
  const allCookies = await getCookies();
  if (!allCookies) {
    return null;
  }
  const cookies = parseCookies(allCookies);
  if (!cookies) {
    return null;
  }
  return cookies;
}

export default async function Page() {
  const cookies = await getData();
  if (cookies?.["belezixadmin.token"]) {
    redirect("/home");
  }
  return <Login />;
}

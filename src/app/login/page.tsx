import { Login } from "@/screens/auth/login/LoginPage";
import { parseCookies } from "@/shared/libs/utils/parseCookies";
import { getCookies } from "@/shared/libs/utils/cookies";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barberix | Agendamentos Online",
  description: "Agende seu horário com os melhores barbeiros da cidade",
};
async function getData() {
  const allCookies = getCookies();
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

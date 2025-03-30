import { whitelabel } from "@/application/whitelabel";
import { HomePage } from "@/slices/appointments/screens/home/HomePage";
import { parseCookies } from "@/shared/libs/utils";
import { getCookies } from "@/shared/libs/cookies";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Agendamentos`,
  description: `Página de listagem de agendamentos do ${whitelabel.systemName}. Aqui você pode criar, editar e excluir agendamentos.`,
};

async function getData() {
  const cookies = await getCookies();
  if (!cookies) {
    return null;
  }
  const parsedCookies = parseCookies(cookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  return parsedCookies;
}

export default async function Page() {
  const cookies = await getData();
  if (!cookies) {
    redirect("/login");
  }
  return <HomePage />;
}

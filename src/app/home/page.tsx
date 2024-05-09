import { config } from "@/application/config";
import { HomePage } from "@/screens/home/HomePage";
import { getCookies, parseCookies } from "@/shared/libs/utils";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import LayoutPayAuthenticated from "@/shared/libs/utils/layoutPayAsync";

export const metadata: Metadata = {
  title: `${config.systemName} | Agendamentos`,
  description: `Página de listagem de agendamentos do ${config.systemName}. Aqui você pode criar, editar e excluir agendamentos.`,
};

async function getData() {
  const cookies = getCookies();
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
  return (
    <LayoutPayAuthenticated>
      <HomePage />
    </LayoutPayAuthenticated>
  );
}

import { config } from "@/application/config";
import type { Metadata } from "next";
import { getOwners } from "@/entidades/owner/owner.api";
import { parseCookies, getCookies } from "@/shared/libs/utils";
import { getClients } from "@/entidades/client";
import { FullCreateRequest } from "@/processes/appointment/FullCreateRequest";
import { getUsers } from "@/entidades/user";

export const revalidate = 3000;
async function getData(pageNumber) {
  const allCookies = getCookies();
  if (!allCookies) return null;
  const [res, clients, clientUsers] = await Promise.all([
    getOwners(pageNumber, parseCookies(allCookies), {}),
    getClients(pageNumber, parseCookies(allCookies), {}),
    getUsers(pageNumber, parseCookies(allCookies), { role: "client" }),
  ]);
  if (!res || !clients || !clientUsers) {
    return null;
  }
  return { owners: res, clients, clientUsers };
}
export const metadata: Metadata = {
  title: `${config.systemName} | Criar Agendamento`,
  description: `Página de criação de agendamentos do ${config.systemName}. Aqui você pode criar agendamento.`,
};

export default async function Page() {
  const data = await getData(1);
  if (!data?.clients || !data?.owners || !data?.clientUsers) return null;

  return <FullCreateRequest {...data} />;
}

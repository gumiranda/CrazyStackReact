import { whitelabel } from "@/application/whitelabel";
import type { Metadata } from "next";
import { getOwners } from "@/slices/appointments/entidades/owner/owner.api";
import { parseCookies } from "@/shared/libs/utils";
import { getClients } from "@/slices/appointments/entidades/client";
import { FullCreateRequest } from "@/slices/appointments/processes/appointment/FullCreateRequest";
import { getUsers } from "@/slices/general/entidades/user";
import { cookies } from "next/headers";

export const revalidate = 3000;
async function getData(pageNumber: number) {
  const allCookies = (await cookies()).getAll();
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
  title: `${whitelabel.systemName} | Criar Agendamento`,
  description: `Página de criação de agendamentos do ${whitelabel.systemName}. Aqui você pode criar agendamento.`,
};

export default async function Page() {
  const data = await getData(1);
  if (!data?.clients || !data?.owners || !data?.clientUsers) return null;

  return <FullCreateRequest {...data} />;
}

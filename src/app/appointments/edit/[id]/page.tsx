import { getAppointmentById } from "@/slices/appointments/entidades/appointment/appointment.api";
import { parseCookies } from "@/shared/libs/utils";
import { getCookies } from "@/shared/libs/cookies";

export const revalidate = 3000;

import { whitelabel } from "@/application/whitelabel";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppointmentEditPage } from "@/slices/appointments/screens/appointment/edit";
import { getOwners } from "@/slices/appointments/entidades/owner/owner.api";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Editar Agendamento`,
  description: `Página de edição de agendamentos do ${whitelabel.systemName}. Aqui você pode editar agendamento.`,
};

async function getData(id) {
  const allCookies = await getCookies();
  const parsedCookies = parseCookies(allCookies);
  if (!parsedCookies?.["belezixadmin.token"]) {
    return null;
  }
  const [owners, data] = await Promise.all([
    getOwners(1, parseCookies(allCookies), {}),
    getAppointmentById(id, parsedCookies),
  ]);
  if (!data || !owners) {
    return null;
  }
  return { data, owners };
}
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const { data, owners } = (await getData(id)) || {};
  if (!data || !owners) {
    redirect("/login");
  }
  return <AppointmentEditPage data={data} id={id} owners={owners} />;
}

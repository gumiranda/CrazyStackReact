"use client";
import { Stack, NavLink, NavSection, Sidebar } from "@/shared/ui";
import {
  RiContactsLine,
  RiArticleLine,
  RiUserSettingsLine,
  RiUser2Fill,
  RiLuggageDepositLine,
  RiEditCircleLine,
  RiWalkFill,
  RiCalendar2Line,
  RiBox1Line,
} from "react-icons/ri";
import { useAuth } from "@/shared/libs";

export const SidebarPanel = () => {
  const { isAuthenticated, user = null } = useAuth() || {};
  if (!isAuthenticated) {
    return null;
  }
  return (
    <Sidebar title="Navegar">
      <Stack spacing="0" align="flex-start">
        <NavSection title="GERAL">
          {/* <NavLink icon={RiCalendar2Line} href="/new-appointment">
            Novo agendamento
          </NavLink> */}
          {/* <NavLink icon={RiUserSettingsLine} href={`/users/delete/${user?._id}`}>
            Minha conta
          </NavLink> */}
          <NavLink icon={RiCalendar2Line} href="/home">
            Minha agenda
          </NavLink>
          <NavLink icon={RiCalendar2Line} href="/appointments/new">
            Criar agendamento
          </NavLink>
          <NavLink icon={RiEditCircleLine} href="/categorys/1">
            Categorias
          </NavLink>
          <NavLink icon={RiWalkFill} href="/services/1">
            Serviços
          </NavLink>
          <NavLink icon={RiContactsLine} href="/clients/1">
            Clientes
          </NavLink>
          <NavLink icon={RiLuggageDepositLine} href="/owners/1">
            Estabelecimentos
          </NavLink>
          <NavLink icon={RiUser2Fill} href="/users/1">
            Profissionais
          </NavLink>
          <NavLink icon={RiArticleLine} href="/requests/1">
            Solicitações
          </NavLink>
          <NavLink icon={RiCalendar2Line} href="/appointments/1">
            Agendamentos
          </NavLink>
          <NavLink icon={RiContactsLine} href="/mapRoutes/1">
            Rotas
          </NavLink>
          <NavLink icon={RiContactsLine} href="/routeDrivers/1">
            Corridas
          </NavLink>
        </NavSection>
      </Stack>
    </Sidebar>
  );
};

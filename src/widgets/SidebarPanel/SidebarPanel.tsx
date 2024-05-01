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
import { useTranslation } from "react-i18next";
import { MdAttachMoney } from "react-icons/md";

export const SidebarPanel = () => {
  const { t } = useTranslation(["PAGES"]);

  const { isAuthenticated, user = null } = useAuth() || {};
  if (!isAuthenticated) {
    return null;
  }
  return (
    <Sidebar
      title={t("PAGES:HOME_PAGE.navigate", {
        defaultValue: "Navegar",
      })}
    >
      <Stack spacing="0" align="flex-start">
        <NavSection title="GERAL">
          {/* <NavLink icon={RiCalendar2Line} href="/new-appointment">
            Novo agendamento
          </NavLink> */}
          {/* <NavLink icon={RiUserSettingsLine} href={`/users/delete/${user?._id}`}>
            Minha conta
          </NavLink> */}
          <NavLink icon={RiCalendar2Line} href="/home">
            {t("PAGES:HOME_PAGE.mySchedule", {
              defaultValue: "Minha agenda",
            })}
          </NavLink>
          <NavLink icon={RiCalendar2Line} href="/appointments/new">
            {t("PAGES:HOME_PAGE.createAppointment", {
              defaultValue: "Criar agendamento",
            })}
          </NavLink>
          <NavLink icon={MdAttachMoney} href="/payment/pix">
            {t("PAGES:HOME_PAGE.mySubscription", {
              defaultValue: "Minha assinatura",
            })}
          </NavLink>
          <NavLink icon={RiEditCircleLine} href="/categorys/1">
            {t("PAGES:HOME_PAGE.categorys", {
              defaultValue: "Categorias",
            })}
          </NavLink>
          <NavLink icon={RiWalkFill} href="/services/1">
            {t("PAGES:HOME_PAGE.services", {
              defaultValue: "Serviços",
            })}
          </NavLink>
          <NavLink icon={RiContactsLine} href="/clients/1">
            {t("PAGES:HOME_PAGE.clients", {
              defaultValue: "Clientes",
            })}
          </NavLink>
          <NavLink icon={RiLuggageDepositLine} href="/owners/1">
            {t("PAGES:HOME_PAGE.owners", {
              defaultValue: "Estabelecimentos",
            })}
          </NavLink>
          <NavLink icon={RiUser2Fill} href="/users/1">
            {t("PAGES:HOME_PAGE.professionals", {
              defaultValue: "Profissionais",
            })}
          </NavLink>
          <NavLink icon={RiArticleLine} href="/requests/1">
            {t("PAGES:HOME_PAGE.requests", {
              defaultValue: "Solicitações",
            })}
          </NavLink>
          <NavLink icon={RiCalendar2Line} href="/appointments/1">
            {t("PAGES:HOME_PAGE.appointments", {
              defaultValue: "Agendamentos",
            })}
          </NavLink>
          <NavLink icon={RiContactsLine} href="/mapRoutes/1">
            {t("PAGES:HOME_PAGE.routes", {
              defaultValue: "Rotas",
            })}
          </NavLink>
          <NavLink icon={RiContactsLine} href="/routeDrivers/1">
            {t("PAGES:HOME_PAGE.rides", {
              defaultValue: "Corridas",
            })}
          </NavLink>
        </NavSection>
      </Stack>
    </Sidebar>
  );
};

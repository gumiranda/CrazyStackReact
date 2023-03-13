import { Stack, NavLink, NavSection, Sidebar } from "shared/ui";
import { RiContactsLine } from "react-icons/ri";
import { useAuth } from "shared/libs";

export const SidebarPanel = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return null;
  }
  return (
    <Sidebar title="Navegação">
      <Stack spacing="0" align="flex-start">
        <NavSection title="GERAL">
          <NavLink icon={RiContactsLine} href="/categorys/1">
            Categorias
          </NavLink>
          <NavLink icon={RiContactsLine} href="/services/1">
            Serviços
          </NavLink>
          <NavLink icon={RiContactsLine} href="/clients/1">
            Clientes
          </NavLink>
          <NavLink icon={RiContactsLine} href="/owners/1">
            Estabelecimentos
          </NavLink>
          <NavLink icon={RiContactsLine} href="/users/1">
            Profissionais
          </NavLink>
          <NavLink icon={RiContactsLine} href="/requests/1">
            Solicitações
          </NavLink>
          <NavLink icon={RiContactsLine} href="/appointments/1">
            Agendamentos
          </NavLink>
        </NavSection>
      </Stack>
    </Sidebar>
  );
};

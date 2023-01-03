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
      <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          <NavLink icon={RiContactsLine} href="/categorys/1">
            Categorias
          </NavLink>
          <NavLink icon={RiContactsLine} href="/services/1">
            Serviços
          </NavLink>
          <NavLink icon={RiContactsLine} href="/owners/1">
            Estabelecimentos
          </NavLink>
          <NavLink icon={RiContactsLine} href="/users/1">
            Profissionais
          </NavLink>
        </NavSection>
      </Stack>
    </Sidebar>
  );
};

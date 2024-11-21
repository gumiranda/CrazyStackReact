import { whitelabel } from "@/application/whitelabel";
import { UserGridPage } from "@/slices/general/screens/user/list/grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Profissionals`,
  description: `Página de listagem de profissionals do ${whitelabel.systemName}. Aqui você pode ver as profissionals em lista infinita.`,
};
export default UserGridPage;

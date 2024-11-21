import { whitelabel } from "@/application/whitelabel";
import { PixFeaturesPage } from "@/slices/general/screens/payment/pix/PixFeaturesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Minha assinatura`,
  description: `Preencha os seus dados pessoais para garantir a assinatura do ${whitelabel.systemName}.`,
};
export default PixFeaturesPage;

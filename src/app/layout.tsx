import { fonts } from "./fonts";
import { AllProviders } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fonts.leagueSpartan.variable}>
      <body>
        <AllProviders>{children}</AllProviders>
      </body>
    </html>
  );
}

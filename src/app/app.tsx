import { AllProviders } from "app/providers";
import type { AppProps } from "next/app";
import { SidebarPanel } from "widgets";

function App({ Component, pageProps }: AppProps) {
  return (
    <AllProviders pageProps={pageProps}>
      <>
        <SidebarPanel />
        <Component {...pageProps} />
      </>
    </AllProviders>
  );
}
export default App;

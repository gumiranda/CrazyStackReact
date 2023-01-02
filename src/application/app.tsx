import { AllProviders } from "application/providers";
import type { AppProps } from "next/app";
import { SidebarPanel, NavBar } from "widgets";

function App({ Component, pageProps }: AppProps) {
  return (
    <AllProviders pageProps={pageProps}>
      <>
        <NavBar />
        <SidebarPanel />
        <Component {...pageProps} />
      </>
    </AllProviders>
  );
}
export default App;

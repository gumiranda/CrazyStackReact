import { AllProviders } from "app/providers";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <AllProviders pageProps={pageProps}>
      <Component {...pageProps} />
    </AllProviders>
  );
}
export default App;

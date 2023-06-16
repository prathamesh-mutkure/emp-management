import { store } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />

      <Toaster />
    </Provider>
  );
}

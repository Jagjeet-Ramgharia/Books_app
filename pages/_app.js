import store from "@/src/Redux/store/store";
import "@/styles/globals.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            enabled: true, // start fetching when component mounts
            refetchOnWindowFocus: false, // do not refetch on window focus
          },
        },
      })
  );
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

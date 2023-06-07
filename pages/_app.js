import store from "@/src/Redux/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { Router } from "next/router";

export default function App({ Component, pageProps }) {
  	const pageKey = Router.asPath
  return (
    <Provider store={store}>
      <AnimatePresence>
        <Component key={pageKey} {...pageProps} />
      </AnimatePresence>
      <ToastContainer />
    </Provider>
  );
}

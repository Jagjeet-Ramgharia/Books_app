import store from "@/src/Redux/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { useRouter } from 'next/app'

export default function App({ Component, pageProps }) {
  	const pageKey = router.asPath
  return (
    <Provider store={store}>
      <AnimatePresence initial={false} mode="popLayout">
        <Component key={pageKey} {...pageProps} />
      </AnimatePresence>
      <ToastContainer />
    </Provider>
  );
}

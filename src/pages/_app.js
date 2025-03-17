import "../styles/globals.css";
import { SlotProvider } from "../context/SlotContext";

export default function App({ Component, pageProps }) {
  return (
    <SlotProvider>
      <Component {...pageProps} />
    </SlotProvider>
  );;
}

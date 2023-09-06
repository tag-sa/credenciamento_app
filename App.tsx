import Loading from "./src/components/Loading/Loading";
import { Router } from "./src/routes";
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <>
      <Loading />
      <FlashMessage position="top" />
      <Router />
    </>
  );
}

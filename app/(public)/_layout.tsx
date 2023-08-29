import { Slot } from "expo-router";
import Loading from "../components/Loading/Loading";

export default function HomeLayout() {
  return (
    <Loading>
      <Slot />
    </Loading>
  );
}

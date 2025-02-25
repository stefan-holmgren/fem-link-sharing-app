import { Header } from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

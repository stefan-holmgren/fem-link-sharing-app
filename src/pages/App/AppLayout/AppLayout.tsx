import styles from "./AppLayout.module.css";
import { Header } from "@/components/Header/Header";
import { MobileAside } from "./components/MobileAside/MobileAside";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className={styles["app-layout"]}>
      <Header />
      <div>
        <MobileAside />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

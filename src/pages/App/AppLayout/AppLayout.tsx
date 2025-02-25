import styles from "./AppLayout.module.css";
import { Header } from "@/components/Header/Header";
import { MobileAside } from "./components/MobileAside/MobileAside";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { MobileAsideContext } from "./components/MobileAside/components/MobileAsideContext/MobileAsideContext";

export const AppLayout = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  return (
    <div className={styles["app-layout"]}>
      <Header />
      <div>
        <MobileAsideContext.Provider value={{ showSkeleton, setShowSkeleton }}>
          <MobileAside showSkeleton={showSkeleton} />
          <main>
            <Outlet />
          </main>
        </MobileAsideContext.Provider>
      </div>
    </div>
  );
};

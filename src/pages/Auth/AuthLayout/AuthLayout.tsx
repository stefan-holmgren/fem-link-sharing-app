import styles from "./AuthLayout.module.css";
import logo from "@/assets/logo-devlinks-large.svg";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <main className={styles["auth-layout"]}>
      <div>
        <h1>
          <img src={logo} alt="devlinks"></img>
        </h1>
        <div>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

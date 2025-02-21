import styles from "./AuthLayout.module.css";
import { ReactNode } from "react";
import logo from "@/assets/logo-devlinks-large.svg";

type AuthLayoutProps = {
  children?: ReactNode;
};
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className={styles["auth-layout"]}>
      <div>
        <h1>
          <img src={logo} alt="devlinks"></img>
        </h1>
        <div>{children}</div>
      </div>
    </main>
  );
};

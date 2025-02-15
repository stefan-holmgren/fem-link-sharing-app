import { auth } from "@/config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [user, setUser] = useState<User | null | undefined>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authorizedUser) => {
      setUser(authorizedUser);
    });
    return unsubscribe;
  }, []);

  return (
    <div className={styles.home}>
      <h1>Home</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <p>{user === undefined ? "Loading..." : <Link to="/login">Login</Link>}</p>
      )}
    </div>
  );
};

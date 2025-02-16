import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../AuthContext/useAuthContext";

export const Home = () => {
  const { user } = useAuthContext();

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

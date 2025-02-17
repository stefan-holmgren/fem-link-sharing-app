import styles from "./Home.module.css";
import { useAuthContext } from "../AuthContext/useAuthContext";
import { Link } from "react-router-dom";
import { LinkForm } from "./components/LinkForm/LinkForm";

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
      {!!user && <LinkForm user={user} />}
    </div>
  );
};

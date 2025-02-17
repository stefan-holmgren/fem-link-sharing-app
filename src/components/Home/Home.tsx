import styles from "./Home.module.css";
import { useAuthContext } from "../AuthContext/useAuthContext";
import { Link } from "react-router-dom";
import { useAsyncData } from "@/hooks/useAsyncData";
import { getUserLinks } from "./utils/userLinks.utils";
import { useCallback, useEffect } from "react";

export const Home = () => {
  const { user } = useAuthContext();

  const fetchFn = useCallback(async () => (user ? await getUserLinks(user) : []), [user]);

  const {
    data: userLinks,
    isPending,
    refetch,
  } = useAsyncData({
    fetchFn,
    autoFetch: false,
  });

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [refetch, user]);

  console.log(userLinks);

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
      {isPending && <p>Loading...</p>}
      {!!userLinks && (
        <ul>
          {userLinks.map((userLink) => (
            <li key={userLink.url}>
              <a href={userLink.url} target="_blank" rel="noopener noreferrer">
                {userLink.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthContext/useAuthContext";
import { useEffect } from "react";

export const RequireAuth = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (user) {
    return <Outlet />;
  }
  return null;
};

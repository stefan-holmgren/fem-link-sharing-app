import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthContext/useAuthContext";

export const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  useEffect(() => {
    logout().then(() => {
      navigate("/login", { replace: true });
    });
  }, [logout, navigate]);

  return null;
};

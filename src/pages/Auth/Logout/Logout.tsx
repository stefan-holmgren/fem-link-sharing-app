import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";

export const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  useEffect(() => {
    logout().then(() => {
      navigate("/", { replace: true });
    });
  }, [logout, navigate]);

  return null;
};

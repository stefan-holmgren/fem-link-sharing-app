import { auth } from "@/config/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.signOut().then(() => {
      navigate("/login", { replace: true });
    });
  }, [navigate]);

  return null;
};

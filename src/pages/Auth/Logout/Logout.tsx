import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect } from "react";

const Logout = () => {
  const { logout } = useAuthContext();
  useEffect(() => {
    logout();
  }, [logout]);
  return null;
};

export default Logout;

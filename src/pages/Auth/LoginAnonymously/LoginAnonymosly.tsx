import { SnackbarContext } from "@/components/SnackbarContext/SnackbarContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { use, useEffect, useTransition } from "react";
import { useNavigate } from "react-router-dom";

const LoginAnonymously = () => {
  const snackbars = use(SnackbarContext);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const { loginAnonymously } = useAuthContext();

  useEffect(() => {
    startTransition(async () => {
      try {
        await loginAnonymously();
        navigate("/", { replace: true });
      } catch {
        snackbars.showSnackbar({
          message: "Failed to login anonymously",
          variant: "negative",
        });
        navigate("/login", { replace: true });
      }
    });
  }, [loginAnonymously, navigate, snackbars]);

  // @todo - spinner?
  return isPending ? "..." : null;
};

export default LoginAnonymously;

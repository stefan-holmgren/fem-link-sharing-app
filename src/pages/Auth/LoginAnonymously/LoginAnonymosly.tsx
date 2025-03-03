import { SnackbarContext } from "@/components/SnackbarContext/SnackbarContext";
import { supabase } from "@/config/supabase";
import { use, useEffect, useTransition } from "react";
import { useNavigate } from "react-router-dom";

const LoginAnonymously = () => {
  const snackbars = use(SnackbarContext);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  useEffect(() => {
    startTransition(async () => {
      try {
        await supabase.auth.signInAnonymously();
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Failed to login anonymously", error);
        snackbars.showSnackbar({
          message: "Failed to login anonymously",
          variant: "negative",
        });
        navigate("/login", { replace: true });
      }
    });
  }, [navigate, snackbars]);

  // @todo - spinner?
  return isPending ? "..." : null;
};

export default LoginAnonymously;

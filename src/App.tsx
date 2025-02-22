import { Route, Routes } from "react-router-dom";
import { Links } from "./pages/App/Links";
import { Login } from "./pages/Auth/Login";
import { Logout } from "./pages/Auth/Logout";
import { SignUp } from "./pages/Auth/SignUp";
import { ForgotPassword } from "./pages/Auth/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./pages/Auth/ResetPassword/ResetPassword";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SupabaseAuthContextProvider } from "./components/AuthContext/supabase/SupabaseAuthContextProvider";
import { AuthLayout } from "./pages/Auth/AuthLayout/AuthLayout";
import { Preview } from "./pages/Preview/Preview";
import { Profile } from "./pages/App/Profile/Profile";
import { AppLayout } from "./pages/App/AppLayout/AppLayout";
import { RequireAuth } from "./components/RequireAuth/RequireAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthContextProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Links />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/preview" element={<Preview />} />
          </Route>
        </Routes>
      </SupabaseAuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;

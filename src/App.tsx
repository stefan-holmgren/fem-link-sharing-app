import { Route, Routes } from "react-router-dom";
import { Links } from "./pages/Links";
import { Login } from "./pages/Auth/Login";
import { Logout } from "./pages/Auth/Logout";
import { SignUp } from "./pages/Auth/SignUp";
import { ForgotPassword } from "./pages/Auth/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./pages/Auth/ResetPassword/ResetPassword";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SupabaseAuthContextProvider } from "./components/AuthContext/supabase/SupabaseAuthContextProvider";
import { AuthLayout } from "./pages/Auth/AuthLayout/AuthLayout";
import { Preview } from "./pages/Preview/Preview";
import { Profile } from "./pages/Profile/Profile";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthContextProvider>
        <Routes>
          <Route path="/" element={<Links />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/preview" element={<Preview />} />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route path="/Logout" element={<Logout />} />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <SignUp />
              </AuthLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <AuthLayout>
                <ForgotPassword />
              </AuthLayout>
            }
          />
          <Route
            path="/reset-password"
            element={
              <AuthLayout>
                <ResetPassword />
              </AuthLayout>
            }
          />
        </Routes>
      </SupabaseAuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;

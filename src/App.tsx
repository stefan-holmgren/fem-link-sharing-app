import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { SignUp } from "./components/SignUp";
import { ForgotPassword } from "./components/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword/ResetPassword";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SupabaseAuthContextProvider } from "./components/AuthContext/supabase/SupabaseAuthContextProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </SupabaseAuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;

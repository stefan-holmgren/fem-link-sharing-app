import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarContextProvider } from "./components/SnackbarContext/SnackbarContextProvider";
import { lazy } from "react";
import { AuthContextProvider } from "./components/AuthContext/AuthContextProvider";

const Links = lazy(() => import("./pages/App/Links/Links"));
const Login = lazy(() => import("./pages/Auth/Login/Login"));
const Logout = lazy(() => import("./pages/Auth/Logout/Logout"));
const SignUp = lazy(() => import("./pages/Auth/SignUp/SignUp"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword/ResetPassword"));
const Preview = lazy(() => import("./pages/Preview/Preview"));
const Profile = lazy(() => import("./pages/App/Profile/Profile"));
const AppLayout = lazy(() => import("./pages/App/AppLayout/AppLayout"));
const AuthLayout = lazy(() => import("./pages/Auth/AuthLayout/AuthLayout"));
const RequireAuth = lazy(() => import("./components/RequireAuth/RequireAuth"));
const LoginAnonymously = lazy(() => import("./pages/Auth/LoginAnonymously/LoginAnonymosly"));
const NotFound404 = lazy(() => import("./pages/NotFound404/NotFound404"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login-anonymously" element={<LoginAnonymously />} />
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
      <Route path="*" element={<NotFound404 />} />
    </>
  ),
  { basename: "/fem-link-sharing-app" }
);

function AppPrivate() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SnackbarContextProvider>
          <RouterProvider router={router} />
        </SnackbarContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default AppPrivate;

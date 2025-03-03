import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy } from "react";

const Public = lazy(() => import("@/pages/Public/Public"));
const NotFound404 = lazy(() => import("@/pages/NotFound404/NotFound404"));

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
      <Route path="/public/:userId" element={<Public />} />
      <Route path="*" element={<NotFound404 />} />
    </>
  )
);

function AppPublic() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default AppPublic;

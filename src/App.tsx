import { lazy } from "react";

const AppPublic = lazy(() => import("./AppPublic"));
const AppPrivate = lazy(() => import("./AppPrivate"));

function App() {
  const location = window.location;
  const isPublic = location.pathname.startsWith("/fem-link-sharing-app/public");

  return isPublic ? <AppPublic /> : <AppPrivate />;
}

export default App;

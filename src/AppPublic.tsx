import { lazy } from "react";

const Public = lazy(() => import("@/pages/Public/Public"));

function AppPublic() {
  return <Public />;
}

export default AppPublic;

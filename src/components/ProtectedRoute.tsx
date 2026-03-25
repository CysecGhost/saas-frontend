import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store";

const ProtectedRoute = ({ requireOrg = true }: { requireOrg?: boolean }) => {
  const { accessToken, orgId } = useSelector((state: RootState) => state.auth);

  if (!accessToken) return <Navigate to="/login" replace />;
  if (requireOrg && !orgId) return <Navigate to="/organizations" replace />;

  return <Outlet />;
};

export default ProtectedRoute;

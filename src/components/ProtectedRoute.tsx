import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";

const ProtectedRoute = ({ children, requireOrg = true, allowedRoles }: { children: React.ReactNode; requireOrg?: boolean; allowedRoles?: string[] }) => {
  const { accessToken, orgId, role } = useSelector((state: RootState) => state.auth);

  if (!accessToken) return <Navigate to="/login" replace />;
  if (requireOrg && !orgId) return <Navigate to="/organizations" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;

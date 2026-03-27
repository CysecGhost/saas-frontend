import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";

const ProtectedRoute = ({ children, requireOrg = true }: { children: React.ReactNode; requireOrg?: boolean }) => {
  const { accessToken, orgId } = useSelector((state: RootState) => state.auth);

  if (!accessToken) return <Navigate to="/login" replace />;
  if (requireOrg && !orgId) return <Navigate to="/organizations" replace />;

  return children;
};

export default ProtectedRoute;

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccessDenied from '../pages/AccessDenied';
import AppLoadingSkeleton from '../components/ui/AppLoadingSkeleton';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading, role } = useAuth();
  const location = useLocation();

  if (loading) return <AppLoadingSkeleton />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <AccessDenied />;
  }

  return children;
}

export function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <AppLoadingSkeleton />;

  if (user) {
    const target = user.role === 'ADMIN' ? '/admin/dashboard' : user.role === 'ATHLETE' ? '/athlete/dashboard' : '/discovery';
    return <Navigate to={target} replace />;
  }

  return children;
}

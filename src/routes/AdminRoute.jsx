import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccessDenied from '../pages/AccessDenied';
import AppLoadingSkeleton from '../components/ui/AppLoadingSkeleton';

export default function AdminRoute({ children }) {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <AppLoadingSkeleton />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isMatch = role && String(role).trim() === 'ADMIN';
  
  console.log('[AdminRoute] Access Check:', { 
    role, 
    type: typeof role,
    isMatch 
  });

  if (!isMatch) {
    console.log('[AdminRoute] Unauthorized Role Access Denied:', role);
    return <AccessDenied />;
  }

  return children;
}

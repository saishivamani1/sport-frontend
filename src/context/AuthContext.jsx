/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, setUser, removeUser, setToken, removeToken, getToken } from '../utils/auth';
import { getCurrentUserApi } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(getToken);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    async function initAuth() {
      try {
        const storedToken = getToken();
        if (!storedToken) {
          if (isMounted) {
            setUserState(null);
            setTokenState(null);
            setLoading(false);
          }
          return;
        }
        // Validating with backend
        const res = await getCurrentUserApi();
        const apiRes = res.data;
        if (apiRes && apiRes.success && apiRes.data) {
          if (isMounted) {
            setUserState(apiRes.data);
            setUser(apiRes.data);
            setTokenState(storedToken);
          }
        }
      } catch {
        if (isMounted) {
          removeToken();
          removeUser();
          setTokenState(null);
          setUserState(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    initAuth();
    return () => { isMounted = false; };
  }, []);

  const login = useCallback((userData, jwtToken) => {
    setToken(jwtToken);
    setUser(userData);
    setTokenState(jwtToken);
    setUserState(userData);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    removeUser();
    setTokenState(null);
    setUserState(null);
    navigate('/login', { replace: true });
  }, [navigate]);

  useEffect(() => {
    const handler = () => logout();
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, [logout]);
  if (user) console.log('[Auth] Role Check:', user.role);
  const role = user?.role || null;

  return (
    <AuthContext.Provider value={{ user, token, role, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

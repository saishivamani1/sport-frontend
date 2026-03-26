import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BellIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);

const LogOutIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);

const ArrowLeftIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

export default function Navbar({ showBack: propShowBack, backLabel: propBackLabel, backPath: propBackPath }) {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const isRootPage = ['/', '/dashboard', '/athlete/dashboard', '/admin/dashboard', '/login', '/register'].includes(location.pathname);
  
  // Use prop if provided, else auto-detect
  const showBack = propShowBack !== undefined ? propShowBack : !isRootPage;

  const backConfig = {
    '/tournaments':       { label: 'Home',        path: '/athlete/dashboard' },
    '/feed':              { label: 'Home',        path: '/athlete/dashboard' },
    '/discovery':         { label: 'Home',        path: '/athlete/dashboard' },
    '/profile':           { label: 'Home',        path: '/athlete/dashboard' },
    '/settings':          { label: 'Profile',     path: '/profile'   },
  };

  const backInfo = propBackLabel ? { label: propBackLabel, path: propBackPath } : (backConfig[location.pathname] || { label: 'Back', path: null });

  const handleBack = () => {
    if (backInfo.path) {
      if (backInfo.path === '/athlete/dashboard' && user?.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate(backInfo.path);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <nav className="h-14 border-b border-[var(--border-subtle)] bg-[var(--bg-base)] flex items-center px-6 gap-4 sticky top-0 z-40">

      {/* ── LEFT: Back arrow (conditional) ── */}
      {showBack && (
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-150 group mr-3"
          aria-label="Go back"
        >
          <span className="w-7 h-7 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-[var(--border-default)] group-hover:bg-[var(--bg-elevated)] transition-all duration-150">
            <ArrowLeftIcon size={14} />
          </span>
          <span className="hidden sm:inline">{backInfo.label}</span>
        </button>
      )}

      {/* ── CENTER/LEFT: Logo ── */}
      <div
        className="font-heading font-bold text-lg cursor-pointer flex items-center gap-2"
        onClick={() => navigate(user ? (user.role === 'ADMIN' ? '/admin/dashboard' : '/athlete/dashboard') : '/')}
      >
        <span className="text-xl">⚡</span>
        <span className="tracking-tight text-white">Sports Hub</span>
      </div>

      {/* ── RIGHT: Auth-conditional UI ── */}
      <div className="ml-auto flex items-center gap-2">

        {loading && (
          <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] animate-pulse" />
        )}

        {!loading && !user && (
          <>
            <button
              onClick={() => navigate('/login')}
              className="px-4 h-9 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-4 h-9 text-sm font-medium rounded-[var(--radius-md)] bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] transition-colors"
            >
              Get Started
            </button>
          </>
        )}

        {!loading && user && (
          <>
            <button
              onClick={() => navigate('/notifications')}
              className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
              aria-label="Notifications"
            >
              <BellIcon size={18} />
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-[var(--border-default)] hover:border-[var(--accent-primary)] transition-colors bg-[var(--accent-muted)] flex items-center justify-center text-sm font-semibold text-[var(--accent-primary)] uppercase"
              aria-label="Profile"
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
              ) : (
                user.username?.[0] || 'U'
              )}
            </button>

            <button
              onClick={handleLogout}
              className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-tertiary)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
              aria-label="Log out"
            >
              <LogOutIcon size={16} />
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const athleteLinks = [
  { to: '/athlete/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/athlete/verification', label: 'Verification', icon: '✅' },
  { to: '/athlete/posts', label: 'My Posts', icon: '📝' },
  { to: '/tournaments', label: 'Tournaments', icon: '🏆' },
];

const adminLinks = [
  { to: '/admin/dashboard', label: 'Overview', icon: '📊' },
  { to: '/admin/verifications', label: 'Verifications', icon: '🔍' },
  { to: '/admin/posts', label: 'Post Queue', icon: '📋' },
  { to: '/admin/tournaments', label: 'Tournaments', icon: '🏆' },
];

const scoutLinks = [
  { to: '/discovery', label: 'Discovery', icon: '🔭' },
  { to: '/feed', label: 'Feed', icon: '📰' },
  { to: '/tournaments', label: 'Tournaments', icon: '🏆' },
];

export default function Sidebar() {
  const { role, logout, loading, user } = useAuth();
  const navigate = useNavigate();

  const links =
    role === 'ADMIN' ? adminLinks
    : role === 'ATHLETE' ? athleteLinks
    : scoutLinks;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (loading) return <aside className="w-60 h-screen bg-[#0B0B0B] animate-pulse border-r border-[#222222] shrink-0" />;
  if (!user) return null;

  return (
    <aside className="h-full flex flex-col bg-[#0B0B0B] py-6 px-4">
      <div className="mb-8 px-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
          Menu
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-[#222222] pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

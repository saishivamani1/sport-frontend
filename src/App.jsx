import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute, { PublicOnlyRoute } from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Public pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const FeedPage = lazy(() => import('./pages/FeedPage'));
const TournamentsPage = lazy(() => import('./pages/TournamentsPage'));
const TournamentDetailPage = lazy(() => import('./pages/TournamentDetailPage'));
const DiscoveryPage = lazy(() => import('./pages/DiscoveryPage'));
const AthleteProfilePage = lazy(() => import('./pages/AthleteProfilePage'));

// Athlete pages
const AthleteDashboard = lazy(() => import('./pages/athlete/AthleteDashboard'));
const AthleteSettings = lazy(() => import('./pages/athlete/AthleteSettings'));
const AthleteVerification = lazy(() => import('./pages/athlete/AthleteVerification'));
const AthletePosts = lazy(() => import('./pages/athlete/AthletePosts'));

// Admin pages (lazy-loaded, not in nav)
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminVerifications = lazy(() => import('./pages/admin/AdminVerifications'));
const AdminPosts = lazy(() => import('./pages/admin/AdminPosts'));
const AdminTournaments = lazy(() => import('./pages/admin/AdminTournaments'));
const AdminApplications = lazy(() => import('./pages/admin/AdminApplications'));

// Error pages
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AccessDenied = lazy(() => import('./pages/AccessDenied'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black animate-fadeIn">
      <div className="relative mb-8">
        <div className="w-16 h-16 border-4 border-neutral-800 rounded-2xl animate-spin group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-white border-t-transparent rounded-2xl animate-spin" style={{ animationDuration: '0.6s' }} />
      </div>
      <div className="space-y-1 text-center">
        <p className="text-white text-xs font-bold uppercase tracking-[0.3em] font-mono animate-pulse">Synchronizing Hub</p>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest opacity-60">Wait for terminal response...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <div className="page-enter">
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
            <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
            <Route path="/feed" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />
            <Route path="/tournaments" element={<ProtectedRoute><TournamentsPage /></ProtectedRoute>} />
            <Route path="/tournaments/:id" element={<ProtectedRoute><TournamentDetailPage /></ProtectedRoute>} />
            <Route path="/discovery" element={<ProtectedRoute><DiscoveryPage /></ProtectedRoute>} />
            <Route path="/athletes/:id" element={<ProtectedRoute><AthleteProfilePage /></ProtectedRoute>} />
            <Route path="/access-denied" element={<AccessDenied />} />

            {/* Athlete */}
            <Route
              path="/athlete/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ATHLETE']}>
                  <AthleteDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/athlete/settings"
              element={
                <ProtectedRoute allowedRoles={['ATHLETE']}>
                  <AthleteSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/athlete/verification"
              element={
                <ProtectedRoute allowedRoles={['ATHLETE']}>
                  <AthleteVerification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/athlete/posts"
              element={
                <ProtectedRoute allowedRoles={['ATHLETE']}>
                  <AthletePosts />
                </ProtectedRoute>
              }
            />

            {/* Admin — secured, hidden from nav */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/verifications"
              element={
                <AdminRoute>
                  <AdminVerifications />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/posts"
              element={
                <AdminRoute>
                  <AdminPosts />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/tournaments"
              element={
                <AdminRoute>
                  <AdminTournaments />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/applications"
              element={
                <AdminRoute>
                  <AdminApplications />
                </AdminRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

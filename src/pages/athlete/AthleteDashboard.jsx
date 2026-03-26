import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useMyPosts } from '../../hooks/usePosts';
import { useVerificationStatus } from '../../hooks/useVerification';
import { useTournaments } from '../../hooks/useTournaments';
import { CardSkeleton } from '../../components/LoadingSkeleton';
import Card from '../../components/Card';
import Button from '../../components/Button';

const QuickStat = memo(({ label, value, icon: Icon }) => {
  return (
    <Card className="hover:border-neutral-700 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-xl text-white">
          {Icon}
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em]">{label}</p>
          <p className="text-xl font-bold text-white mt-0.5">{value ?? '—'}</p>
        </div>
      </div>
    </Card>
  );
});

export default function AthleteDashboard() {
  const { user } = useAuth();
  const { data: posts, isLoading: postsLoading } = useMyPosts();
  const { data: verification } = useVerificationStatus();
  const { data: tournaments } = useTournaments();

  const approvedPosts = posts?.filter((p) => p.status === 'APPROVED')?.length ?? 0;
  const pendingPosts = posts?.filter((p) => p.status === 'PENDING_REVIEW')?.length ?? 0;

  const verificationStatus = verification?.verificationStatus ?? 'BASIC';
  const verificationBadge = {
    VERIFIED:             { label: 'Verified',       cls: 'text-blue-500 border-blue-500/20 bg-blue-500/5' },
    PENDING_VERIFICATION: { label: 'Pending Review', cls: 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' },
    REJECTED:             { label: 'Rejected',       cls: 'text-red-500 border-red-500/20 bg-red-500/5' },
    BASIC:                { label: 'Not Verified',   cls: 'text-gray-500 border-neutral-800 bg-neutral-900' },
  };
  const badge = verificationBadge[verificationStatus] || verificationBadge.BASIC;

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
            <p className="text-sm text-gray-400">Welcome back, {user?.name}. Monitor your professional growth here.</p>
          </div>
          <div className={`px-3 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-widest ${badge.cls}`}>
            {badge.label}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickStat icon="📝" label="Approved Posts" value={approvedPosts} />
          <QuickStat icon="🕐" label="Pending Review" value={pendingPosts} />
          <QuickStat icon="🏆" label="Active Events" value={tournaments?.length ?? 0} />
          <QuickStat icon="⚡" label="Your Sport" value={verification?.sport || 'N/A'} />
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity Card */}
          <Card className="lg:col-span-2">
            <Card.Header 
              title="Recent Activity" 
              subtitle="Latest status of your achievements and posts."
              action={<Link to="/athlete/posts"><Button variant="ghost" size="sm">View All</Button></Link>}
            />
            <Card.Content>
              {postsLoading ? (
                <div className="space-y-4">
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              ) : posts?.length ? (
                <div className="space-y-4">
                  {posts.slice(0, 4).map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 flex items-center justify-between">
                      <p className="text-xs text-gray-300 truncate pr-4 font-medium">{p.title || p.description}</p>
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-tighter ${
                        p.status === 'APPROVED' ? 'text-green-500 bg-green-500/5' : 
                        p.status === 'REJECTED' ? 'text-red-500 bg-red-500/5' : 
                        'text-yellow-500 bg-yellow-500/5'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center space-y-4 border-2 border-dashed border-neutral-800 rounded-2xl">
                   <p className="text-sm text-gray-500">No activity yet. Start building your legacy.</p>
                   <Link to="/athlete/posts">
                     <Button size="sm">Create First Post</Button>
                   </Link>
                </div>
              )}
            </Card.Content>
          </Card>

          {/* Quick Actions Sidebar inside content */}
          <div className="space-y-6">
             <Card className="bg-neutral-900 border-neutral-800 shadow-xl overflow-hidden relative">
                <div className="relative z-10 space-y-4">
                   <h4 className="text-sm font-bold text-white uppercase tracking-widest">Verify Profile</h4>
                   <p className="text-xs text-gray-400 leading-relaxed">Identity verification is required to participate in most national tournaments.</p>
                   <Link to="/athlete/verification" className="block">
                      <Button variant="secondary" className="w-full">Open Verification</Button>
                   </Link>
                </div>
                {/* Visual accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -mr-12 -mt-12 blur-2xl" />
             </Card>

             <Card className="bg-neutral-900 border-neutral-800 shadow-xl overflow-hidden relative">
                <div className="relative z-10 space-y-4">
                   <h4 className="text-sm font-bold text-white uppercase tracking-widest">Growth Center</h4>
                   <p className="text-xs text-gray-400 leading-relaxed">Discover upcoming tournaments and regional leagues in your area.</p>
                   <Link to="/tournaments" className="block">
                      <Button variant="secondary" className="w-full">Find Events</Button>
                   </Link>
                </div>
                {/* Visual accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full -mr-12 -mt-12 blur-2xl" />
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

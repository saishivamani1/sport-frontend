import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { usePendingVerifications, usePendingPosts } from '../../hooks/useAdmin';
import Card from '../../components/Card';
import Button from '../../components/Button';

const StatCard = memo(({ icon, label, value, to }) => {
  return (
    <Link to={to} className="block group">
      <Card hover className="h-full">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-xl text-white group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</p>
            <p className="text-xl font-bold text-white mt-0.5">{value ?? '—'}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
});

export default function AdminDashboard() {
  const { data: verifications } = usePendingVerifications();
  const { data: posts } = usePendingPosts();

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-white uppercase tracking-tight">Admin Console</h1>
            <p className="text-sm text-gray-400">System surveillance and platform moderation.</p>
          </div>
          <div className="hidden md:block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/5 px-3 py-1.5 rounded-full border border-blue-500/10">
               Live Status
            </span>
          </div>
        </div>

        {/* Oversight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon="🔍" label="Active Verifications" value={verifications?.length} to="/admin/verifications" />
          <StatCard icon="📋" label="Pending Feed Items" value={posts?.length} to="/admin/posts" />
          <StatCard icon="🏆" label="Regional Events" value="Manage" to="/admin/tournaments" />
          <StatCard icon="👥" label="Discovery Grid" value="View" to="/discovery" />
        </div>

        {/* Quick Commands Container */}
        <Card className="p-8 space-y-8">
          <header className="space-y-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Administrative Commands</h3>
            <p className="text-xs text-gray-500 font-medium">Frequently used platform management operations.</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <Link to="/admin/verifications">
              <Button variant="secondary" className="w-full">Audit Verifications</Button>
            </Link>
            <Link to="/admin/posts">
              <Button variant="secondary" className="w-full">Review Submissions</Button>
            </Link>
            <Link to="/admin/tournaments">
              <Button className="w-full">Create Event</Button>
            </Link>
          </div>
        </Card>

        {/* System Logs / Meta Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Card className="p-6 bg-neutral-900 border-neutral-800">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Moderation Queue</h4>
              <p className="text-xs text-gray-400 leading-relaxed italic">The current volume of pending athlete broadcast items is low. No urgent action required for standard SLA.</p>
           </Card>
           <Card className="p-6 bg-neutral-900 border-neutral-800">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Platform Health</h4>
              <p className="text-xs text-gray-400 leading-relaxed italic font-medium">All regional synchronization services are operational. Identity verification layer reporting 100% up-time.</p>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

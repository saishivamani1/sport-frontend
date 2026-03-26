import React, { useState, memo } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useMyPosts } from '../../hooks/usePosts';
import { CardSkeleton } from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import PostCreateModal from '../../components/PostCreateModal';
import Button from '../../components/Button';
import Card from '../../components/Card';

const statusConfig = {
  APPROVED: { label: 'APPROVED', cls: 'text-green-500 border-green-500/20 bg-green-500/5' },
  PENDING_REVIEW: { label: 'PENDING REVIEW', cls: 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' },
  REJECTED: { label: 'REJECTED', cls: 'text-red-500 border-red-500/20 bg-red-500/5' },
};

const PostCard = memo(({ post }) => {
  const s = statusConfig[post.status] || statusConfig.PENDING_REVIEW;
  return (
    <Card className="hover:border-neutral-700 transition-colors">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className={`text-[10px] px-2.5 py-0.5 rounded-lg border font-bold tracking-widest uppercase ${s.cls}`}>
            {s.label}
          </span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            {post.submittedAt ? new Date(post.submittedAt).toLocaleDateString() : 'JUST NOW'}
          </span>
        </div>

        <div className="space-y-4">
          <h4 className="text-white text-sm font-bold uppercase tracking-wide">{post.title}</h4>
          <p className="text-gray-300 text-sm leading-relaxed">{post.description}</p>
          
          {post.proofUrl && (
            <div className="aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
              <img
                src={post.proofUrl}
                alt="Post attachment"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {post.status === 'REJECTED' && post.rejectionReason && (
          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4">
            <p className="text-red-400 text-[11px] font-medium leading-relaxed">
              <span className="uppercase font-bold mr-2 opacity-60 tracking-wider">Moderation Feedback:</span> 
              {post.rejectionReason}
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-neutral-800">
          <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
            {post.sport || 'General Athletics'}
          </span>
        </div>
      </div>
    </Card>
  );
});

export default function AthletePosts() {
  const { data: posts, isLoading } = useMyPosts();
  const [showCreate, setShowCreate] = useState(false);

  const approved = posts?.filter((p) => p.status === 'APPROVED') ?? [];
  const pending = posts?.filter((p) => p.status === 'PENDING_REVIEW') ?? [];
  const rejected = posts?.filter((p) => p.status === 'REJECTED') ?? [];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-white">My Posts</h1>
            <p className="text-sm text-gray-400">Manage your highlights and achievements feed.</p>
          </div>
          <Button onClick={() => setShowCreate(true)}>Create Post</Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Published', count: approved.length, icon: '✨', cls: 'text-green-500' },
            { label: 'Pending', count: pending.length, icon: '⏳', cls: 'text-yellow-500' },
            { label: 'Rejected', count: rejected.length, icon: '🚫', cls: 'text-red-500' },
          ].map((s) => (
            <Card key={s.label} className="p-4 flex items-center justify-between border-neutral-800">
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-white tracking-tight">{s.count}</p>
              </div>
              <span className="text-2xl opacity-20">{s.icon}</span>
            </Card>
          ))}
        </div>

        {/* Posts List */}
        <div className="max-w-2xl space-y-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          ) : posts?.length ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <EmptyState
              title="Your feed is empty"
              description="Share your first professional achievement or training milestone to build your legacy."
            />
          )}
        </div>
      </div>

      <PostCreateModal isOpen={showCreate} onClose={() => setShowCreate(false)} />
    </DashboardLayout>
  );
}

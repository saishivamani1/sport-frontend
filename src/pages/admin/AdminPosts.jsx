import React, { useState, memo } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { usePendingPosts, usePostModeration } from '../../hooks/useAdmin';
import { TableRowSkeleton } from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Card from '../../components/Card';

const RejectReasonModal = memo(({ isOpen, onClose, onConfirm, loading }) => {
  const [reason, setReason] = useState('');
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Moderate Content">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Rejection Rationale</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            placeholder="Explain why this broadcast was rejected (e.g. Policy violation)..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-red-500/50 resize-none transition-all"
          />
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="flex-1" onClick={onClose}>Discard</Button>
          <Button variant="danger" loading={loading} className="flex-1" onClick={() => { onConfirm(reason); setReason(''); }}>
            Confirm Rejection
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default function AdminPosts() {
  const { data: posts, isLoading } = usePendingPosts();
  const { approve, reject } = usePostModeration();
  const [rejectTarget, setRejectTarget] = useState(null);

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-white uppercase tracking-tight">Broadcast Moderation</h1>
            <p className="text-sm text-gray-400">Review and authorize athlete social transmissions.</p>
          </div>
          <div className="hidden md:block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">
               {posts?.length ?? 0} Items Pending
            </span>
          </div>
        </div>

        {/* Moderation Table Container */}
        <Card className="p-0 overflow-hidden border-neutral-800 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Athlete</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Content Preview</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sport Tag</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={4} />)
                ) : posts?.length ? (
                  posts.map((post) => (
                    <tr key={post.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[11px] font-bold text-white uppercase group-hover:bg-neutral-700 transition-colors">
                            {post.athleteName?.[0] || 'A'}
                          </div>
                          <div>
                            <span className="block text-sm font-semibold text-white">{post.athleteName || `Athlete #${post.id}`}</span>
                            <span className="text-[10px] text-gray-600 uppercase font-bold tracking-wider">
                               {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'RECENT'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 max-w-xs">
                        <p className="text-gray-300 text-sm truncate font-medium">{post.content}</p>
                        {post.imageUrl && (
                          <a href={post.imageUrl} target="_blank" rel="noreferrer" className="inline-block mt-1 text-[9px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">
                             View Attachment Asset
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-neutral-800 text-gray-500 border border-neutral-700">
                          {post.sport || 'GENERAL'}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setRejectTarget(post.id)}
                            className="bg-transparent border-neutral-700 hover:text-red-400 hover:border-red-500/30"
                          >
                            Block
                          </Button>
                          <Button
                            size="sm"
                            loading={approve.isPending}
                            onClick={() => approve.mutate(post.id)}
                            className="bg-white text-black hover:bg-neutral-200"
                          >
                            Authorize
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <EmptyState title="Queue Terminal" description="The transmission moderation queue is current clear. No pending items found." />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <RejectReasonModal
        isOpen={!!rejectTarget}
        onClose={() => setRejectTarget(null)}
        loading={reject.isPending}
        onConfirm={(reason) => {
          reject.mutate({ id: rejectTarget, reason });
          setRejectTarget(null);
        }}
      />
    </DashboardLayout>
  );
}

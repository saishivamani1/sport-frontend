import React, { useState, memo } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { usePendingVerifications, useVerificationAction } from '../../hooks/useAdmin';
import { TableRowSkeleton } from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Card from '../../components/Card';

const RejectReasonModal = memo(({ isOpen, onClose, onConfirm, loading }) => {
  const [reason, setReason] = useState('');
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reject Verification">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Rejection Feedback</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            placeholder="Provide specific reasons for rejection (e.g. Blurred document)..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-red-500/50 resize-none transition-all"
          />
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button variant="danger" loading={loading} className="flex-1" onClick={() => { onConfirm(reason); setReason(''); }}>
            Confirm Rejection
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default function AdminVerifications() {
  const { data: verifications, isLoading } = usePendingVerifications();
  const { approve, reject } = useVerificationAction();
  const [rejectTarget, setRejectTarget] = useState(null);

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-white uppercase tracking-tight">Verification Audit</h1>
            <p className="text-sm text-gray-400">Review and authorize identity credentials for platform access.</p>
          </div>
          <div className="hidden md:block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">
               {verifications?.length ?? 0} Pending Requests
            </span>
          </div>
        </div>

        {/* Audit Table Table */}
        <Card className="p-0 overflow-hidden border-neutral-800 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Athlete Profile</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Verification Material</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Queue Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={4} />)
                ) : verifications?.length ? (
                  verifications.map((v) => (
                    <tr key={v.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[11px] font-bold text-white uppercase group-hover:bg-neutral-700 transition-colors">
                            {v.athleteName?.[0] || 'A'}
                          </div>
                          <div>
                            <span className="block text-sm font-semibold text-white">{v.athleteName || `Athlete #${v.id}`}</span>
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Region Verified</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        {v.documentUrl ? (
                          <a href={v.documentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold text-[10px] uppercase tracking-widest transition-colors border border-blue-500/10 bg-blue-500/5 px-2.5 py-1 rounded-lg">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Document
                          </a>
                        ) : (
                          <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">No Document</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-yellow-500/10 text-yellow-500 border border-yellow-500/10">
                          {v.status || 'INGESTED'}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setRejectTarget(v.id)}
                            className="bg-transparent border-neutral-700 hover:text-red-400 hover:border-red-500/30"
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            loading={approve.isPending}
                            onClick={() => approve.mutate(v.id)}
                            className="bg-white text-black hover:bg-neutral-200"
                          >
                            Approve
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <EmptyState title="Queue Cleared" description="All pending identity verifications have been processed for the current region." />
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

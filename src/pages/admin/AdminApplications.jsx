import React, { memo } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAdminApplications, useUpdateApplicationStatus } from '../../hooks/useTournaments';
import { TableRowSkeleton } from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import Button from '../../components/Button';
import Card from '../../components/Card';

export default function AdminApplications() {
  const { data: applications, isLoading } = useAdminApplications();
  const updateStatus = useUpdateApplicationStatus();

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-white uppercase tracking-tight">Event Registrations</h1>
            <p className="text-sm text-gray-400">Review and moderate athlete applications for regional tournaments.</p>
          </div>
          <div className="hidden md:block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">
               {applications?.length ?? 0} Total Submissions
            </span>
          </div>
        </div>

        {/* Audit Table */}
        <Card className="p-0 overflow-hidden border-neutral-800 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Athlete</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Tournament</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Current Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={4} />)
                ) : applications?.length ? (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[11px] font-bold text-white uppercase group-hover:bg-neutral-700 transition-colors">
                            {app.athleteName?.[0] || 'A'}
                          </div>
                          <div>
                            <span className="block text-sm font-semibold text-white">{app.athleteName || `Athlete #${app.athleteId}`}</span>
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Ranked Competitor</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                         <span className="text-sm font-medium text-gray-300">{app.tournamentName}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
                          app.status === 'APPROVED' ? 'bg-green-500/10 text-green-500 border-green-500/10' : 
                          app.status === 'REJECTED' ? 'bg-red-500/10 text-red-500 border-red-500/10' : 
                          'bg-yellow-500/10 text-yellow-500 border-yellow-500/10'
                        }`}>
                          {app.status || 'PENDING'}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          {app.status === 'PENDING' && (
                            <>
                              <Button
                                size="sm"
                                variant="secondary"
                                loading={updateStatus.isPending}
                                onClick={() => updateStatus.mutate({ id: app.id, approve: false })}
                                className="bg-transparent border-neutral-700 hover:text-red-400 hover:border-red-500/30"
                              >
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                loading={updateStatus.isPending}
                                onClick={() => updateStatus.mutate({ id: app.id, approve: true })}
                                className="bg-white text-black hover:bg-neutral-200"
                              >
                                Approve
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <EmptyState title="No Applications" description="There are currently no active athlete submissions for regional tournaments." />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

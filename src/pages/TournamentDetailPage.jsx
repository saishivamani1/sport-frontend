import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useTournament, useApplyToTournament } from '../hooks/useTournaments';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { ProfileSkeleton } from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

export default function TournamentDetailPage() {
  const { id } = useParams();
  const { data: tournament, isLoading, isError } = useTournament(id);
  const { role, isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const apply = useApplyToTournament();

  const handleApply = () => {
    apply.mutate(id, { onSuccess: () => setShowModal(false) });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          <ProfileSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-32 bg-neutral-900 rounded-2xl animate-pulse" />)}
          </div>
        </div>
      </MainLayout>
    );
  }

  if (isError || !tournament) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto py-20">
          <EmptyState title="Tournament not found" description="The requested event could not be synchronized or does not exist." />
          <div className="flex justify-center mt-8">
            <Link to="/tournaments">
              <Button variant="secondary">Back to Events</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        {/* Page Header / Hero Card */}
        <Card className="p-8 md:p-12 relative overflow-hidden bg-neutral-900 border-neutral-800">
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-4 flex-1">
                 <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center text-3xl shadow-xl border border-neutral-700">
                    🏆
                 </div>
                 <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight uppercase tracking-widest">{tournament.name}</h1>
                    <p className="text-gray-400 text-sm max-w-xl leading-relaxed font-medium">{tournament.description}</p>
                 </div>
              </div>
              {isAuthenticated && role === 'ATHLETE' && (
                <Button size="lg" className="shrink-0 shadow-2xl shadow-blue-500/10" onClick={() => setShowModal(true)}>
                  Apply Now
                </Button>
              )}
           </div>
           {/* Visual accent */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        </Card>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Start Date', value: tournament.startDate ? new Date(tournament.startDate).toLocaleDateString() : 'To Be Announced' },
            { label: 'Location', value: tournament.location || 'Online Event' },
            { label: 'Sport', value: tournament.sport || 'Multi-sport' },
            { label: 'Status', value: tournament.status || 'OPEN' },
          ].map(({ label, value }) => (
            <Card key={label} className="p-5 border-neutral-800">
               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">{label}</p>
               <p className="text-white font-semibold uppercase tracking-tight text-sm">{value}</p>
            </Card>
          ))}
        </div>

        {/* Detail Content Section */}
        <Card className="p-8 space-y-6">
           <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] border-b border-neutral-800 pb-4">Tournament Highlights</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div className="space-y-4">
                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">General Rules</h4>
                 <p className="text-sm text-gray-300 leading-relaxed font-medium">Standard regional guidelines apply. Verification status is required for all athletes prior to the start date.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Entry Fee</h4>
                 <p className="text-sm text-gray-300 leading-relaxed font-medium">Free for verified Sports Hub athletes during the pilot regional season.</p>
              </div>
           </div>
        </Card>

        {/* Navigation Footer */}
        <div className="pt-12 text-center">
            <Link to="/tournaments">
              <Button variant="ghost" className="gap-2 text-gray-500 hover:text-white uppercase tracking-[0.2em] text-[10px] font-bold">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                 </svg>
                 Return to Tournaments
              </Button>
            </Link>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm Application">
        <div className="space-y-6">
          <p className="text-sm font-medium text-gray-400 leading-relaxed">
            Are you sure you want to apply to <strong className="text-white uppercase tracking-tight">{tournament?.name}</strong>? 
            Ensure your professional profile and verification details are up to date.
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => setShowModal(false)} className="flex-1">Discard</Button>
            <Button onClick={handleApply} loading={apply.isPending} className="flex-1">Apply Now</Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
}

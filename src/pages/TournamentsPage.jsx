import React, { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTournaments } from '../hooks/useTournaments';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const TrophyIcon = ({ size = 24, className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);

const SearchIcon = ({ size = 16, className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const FilterIcon = ({ size = 15, className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);

const PlusIcon = ({ size = 16, className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

const AlertCircleIcon = ({ size = 16, className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);

const XIcon = ({ size = 14, className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

const ItemCard = memo(({ item }) => {
  const statusColors = {
    OPEN: "success",
    CLOSED: "error",
    UPCOMING: "primary"
  };
  
  return (
    <Link to={`/tournaments/${item.id}`} className="block h-full outline-none">
      <Card hover className="h-full flex flex-col">
        <Card.Header divider={false} className="!mb-2 flex items-start justify-between">
          <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--accent-primary)] border border-[var(--border-subtle)]">
            <TrophyIcon size={18} />
          </div>
          <Badge variant={statusColors[item.status] || "default"}>{item.status || "OPEN"}</Badge>
        </Card.Header>
        
        <div className="flex-1">
          <Card.Title>{item.name}</Card.Title>
          {item.description && (
            <Card.Description className="line-clamp-2">{item.description}</Card.Description>
          )}
        </div>
        
        <Card.Footer className="mt-auto">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-xs text-[var(--text-secondary)] font-medium">
              Start: {item.startDate ? new Date(item.startDate).toLocaleDateString() : 'TBA'}
            </span>
            <span className="text-xs text-[var(--text-tertiary)]">
              {item.location || 'Online Event'} &bull; {item.sport || 'Multi-sport'}
            </span>
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
});

export default function TournamentsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: tournaments, isLoading: loading, isError } = useTournaments();
  const [errorDismissed, setErrorDismissed] = useState(false);

  const error = isError && !errorDismissed ? "Failed to load tournaments. Pulse check your connection." : null;

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Tournaments
            </h1>
            <p className="text-sm text-[var(--text-tertiary)] mt-1">
              Discover and participate in professional-grade competitions.
            </p>
          </div>
          {user && (
            <button
              onClick={() => navigate('/tournaments/create')}
              className="flex-shrink-0 flex items-center gap-2 h-10 px-5 bg-[var(--accent-primary)] text-white text-sm font-medium rounded-[var(--radius-md)] hover:bg-[var(--accent-hover)] transition-colors"
            >
              <PlusIcon size={16} />
              Create Event
            </button>
          )}
        </div>

        {/* ── Search + Filters row ── */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
            <input
              type="text"
              placeholder="Search tournaments..."
              className="w-full h-10 pl-9 pr-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all"
            />
          </div>
          <button className="flex items-center gap-2 h-10 px-4 rounded-[var(--radius-md)] border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors">
            <FilterIcon size={15} />
            Filters
          </button>
        </div>

        {/* ── Error state (subtle, not a red banner) ── */}
        {error && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
            <AlertCircleIcon size={16} className="flex-shrink-0" />
            <span>{error}</span>
            <button onClick={() => setErrorDismissed(true)} className="ml-auto text-red-400/60 hover:text-red-400">
              <XIcon size={14} />
            </button>
          </div>
        )}

        {/* ── Loading state ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-[var(--radius-lg)] bg-[var(--bg-elevated)] animate-pulse" />
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !error && (!tournaments || tournaments.length === 0) && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-[var(--radius-xl)] bg-[var(--bg-elevated)] flex items-center justify-center mb-4">
              <TrophyIcon size={24} className="text-[var(--text-tertiary)]" />
            </div>
            <h3 className="font-heading text-lg font-semibold">No active events</h3>
            <p className="text-sm text-[var(--text-tertiary)] mt-1 max-w-xs">
              Check back later or host your own tournament.
            </p>
            {user && (
              <button
                onClick={() => navigate('/tournaments/create')}
                className="mt-6 h-10 px-6 bg-[var(--accent-primary)] text-white text-sm font-medium rounded-[var(--radius-md)] hover:bg-[var(--accent-hover)] transition-colors"
              >
                Host Tournament
              </button>
            )}
          </div>
        )}

        {/* ── Tournament cards grid ── */}
        {!loading && tournaments?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map(t => (
              <ItemCard key={t.id} item={t} />
            ))}
          </div>
        )}

      </div>
    </>
  );
}

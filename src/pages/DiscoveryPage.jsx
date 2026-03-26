import React, { useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { useAthletes } from '../hooks/useAthletes';
import { useDebounce } from '../hooks/useDebounce';
import Navbar from '../components/Navbar';
import { PageHeader } from '../components/ui/PageHeader';
import { FormField } from '../components/ui/FormField';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';

const SPORTS = ['All', 'Football', 'Basketball', 'Cricket', 'Tennis', 'Athletics', 'Swimming', 'Boxing', 'Kabaddi'];

const AlertCircleIcon = ({ size = 16, className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);

const XIcon = ({ size = 14, className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

const SearchIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const ResultCard = memo(({ data }) => (
  <Link to={`/athletes/${data.id}`} className="block h-full outline-none">
    <Card hover className="h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-[var(--radius-full)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--accent-primary)] border border-[var(--border-subtle)] shrink-0">
          {data.name ? <span className="font-bold text-lg uppercase">{data.name[0]}</span> : <UserIcon />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-semibold text-[var(--text-primary)] truncate">{data.name}</h3>
            {data.verificationStatus === 'VERIFIED' && <Badge variant="primary" size="xs">✓ VERIFIED</Badge>}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">{data.sport || 'Multi-sport'}</p>
        </div>
      </div>
      
      {data.bio && (
        <p className="text-sm text-[var(--text-tertiary)] flex-1 line-clamp-2 mb-4">
          {data.bio}
        </p>
      )}

      <Card.Footer className="mt-auto">
        <div className="flex items-center gap-2">
          <Badge variant="default">Cred: {data.credibilityScore ?? 0}</Badge>
        </div>
        {data.location && (
          <span className="text-xs font-medium text-[var(--text-secondary)]">{data.location}</span>
        )}
      </Card.Footer>
    </Card>
  </Link>
));

export default function DiscoveryPage() {
  const [search, setSearch] = useState('');
  const [sport, setSport] = useState('All');
  
  const debouncedSearch = useDebounce(search, 400);
  const { data: athletes, isLoading: loading, isError } = useAthletes({
    search: debouncedSearch || undefined,
    sport: sport !== 'All' ? sport : undefined,
  });

  const [errorDismissed, setErrorDismissed] = useState(false);
  const error = isError && !errorDismissed ? "Failed to synchronize discovered athletes. Pulse check your connection." : null;

  const filteredData = useMemo(() => {
    if (!athletes) return [];
    return athletes.filter((a) => {
      const matchSearch = !debouncedSearch || a.name?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchSport = sport === 'All' || a.sport === sport;
      return matchSearch && matchSport;
    });
  }, [athletes, debouncedSearch, sport]);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <PageHeader 
          title="Discover" 
          subtitle="Find elite athletes and rising stars" 
        />

        {error && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
            <AlertCircleIcon size={16} className="flex-shrink-0" />
            <span>{error}</span>
            <button onClick={() => setErrorDismissed(true)} className="ml-auto text-red-400/60 hover:text-red-400">
              <XIcon size={14} />
            </button>
          </div>
        )}

        <div className="max-w-2xl mb-6">
          <FormField
            leftIcon={<SearchIcon />}
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-8">
          {SPORTS.map(f => (
            <button 
              key={f}
              onClick={() => setSport(f)}
              className={`
                px-3 py-1.5 rounded-[var(--radius-full)] text-sm font-medium transition-colors border
                ${sport === f
                  ? "bg-[var(--accent-muted)] border-[var(--accent-primary)] text-[var(--accent-primary)]"
                  : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-default)]"
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-full text-center py-10 text-[var(--text-tertiary)] animate-pulse">Loading athletes...</p>
          ) : filteredData.length > 0 ? (
            filteredData.map(r => <ResultCard key={r.id} data={r} />)
          ) : (
            <div className="col-span-full">
              <EmptyState 
                icon={<SearchIcon size={24} />} 
                title="No athletes found" 
                description="Adjust your search or filters to discover matching talent." 
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

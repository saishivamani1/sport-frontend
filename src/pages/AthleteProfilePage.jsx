import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAthlete } from '../hooks/useAthletes';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';

function StatBox({ label, value, icon }) {
  return (
    <Card className="flex flex-col items-center justify-center text-center">
      <span className="text-2xl mb-2 opacity-60">{icon}</span>
      <p className="text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-1">{value ?? '0'}</p>
      <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider">{label}</p>
    </Card>
  );
}

function AchievementItem({ achievement, date, isLast }) {
  return (
    <div className="flex gap-4 group">
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-tertiary)] group-hover:bg-[var(--accent-primary)] transition-colors shrink-0 mt-1" />
        {!isLast && <div className="w-px flex-1 bg-[var(--border-subtle)] my-2" />}
      </div>
      <div className="pb-6 flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-[var(--text-primary)]">{achievement}</p>
          {date && <p className="text-xs text-[var(--text-tertiary)]">{new Date(date).toLocaleDateString()}</p>}
        </div>
        <p className="text-sm text-[var(--text-secondary)]">Official regional documentation verified by Sports Hub.</p>
      </div>
    </div>
  );
}

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
);

export default function AthleteProfilePage() {
  const { id } = useParams();
  const { data: athlete, isLoading, isError } = useAthlete(id);

  if (isLoading) {
    return (
      <DashboardLayout>
        <p className="text-center py-20 text-[var(--text-tertiary)] animate-pulse">Loading athlete profile...</p>
      </DashboardLayout>
    );
  }

  if (isError || !athlete) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto py-20">
          <EmptyState title="Athlete not found" description="This professional profile could not be synchronized or does not exist." />
          <div className="flex justify-center mt-8">
            <Link to="/discovery"><Button variant="secondary">Back to Discovery</Button></Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        <Card padding="lg" className="relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <div className="w-32 h-32 rounded-[var(--radius-xl)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--accent-primary)] border border-[var(--border-subtle)] shrink-0 shadow-[var(--shadow-md)]">
              {athlete.username ? <span className="text-5xl font-bold uppercase">{athlete.username[0]}</span> : <UserIcon />}
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h1 className="text-3xl font-bold text-[var(--text-primary)]">{athlete.username}</h1>
                  {athlete.verified && <Badge variant="primary" size="md">✓ VERIFIED</Badge>}
                </div>
                <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{athlete.sport || 'Elite Talent'}</p>
              </div>

              {athlete.location && (
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-sm font-medium text-[var(--text-tertiary)]">
                  <LocationIcon /> {athlete.location}
                </div>
              )}

              {athlete.bio && (
                <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto md:mx-0 leading-relaxed">
                  {athlete.bio}
                </p>
              )}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatBox label="Credibility Score" value={athlete.credibilityScore ?? 0} icon="⭐" />
          <StatBox label="Active Broadcasts" value={athlete.postCount ?? 0} icon="📡" />
          <StatBox label="Events Joined" value={athlete.tournamentCount ?? 0} icon="🏆" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Card className="p-8">
            <Card.Header><Card.Title>Career Timeline</Card.Title></Card.Header>
            <div className="pt-2">
              {athlete.achievements?.length > 0 ? (
                athlete.achievements.map((ach, i) => (
                  <AchievementItem
                    key={i}
                    achievement={typeof ach === 'string' ? ach : (ach.title || ach.achievement)}
                    date={ach.date}
                    isLast={i === athlete.achievements.length - 1}
                  />
                ))
              ) : (
                <p className="text-xs text-[var(--text-tertiary)] italic">No verified achievements recorded yet.</p>
              )}
            </div>
          </Card>

          <Card className="p-8">
            <Card.Header className="flex justify-between items-center">
              <Card.Title>Recent Updates</Card.Title>
              <Link to="/feed">
                <Button variant="ghost" size="xs">View Feed</Button>
              </Link>
            </Card.Header>
            <div className="space-y-6 pt-2">
              {athlete.recentPosts?.length > 0 ? (
                athlete.recentPosts.map((post) => (
                  <div key={post.id} className="relative pl-6 border-l border-[var(--border-subtle)] space-y-2">
                    <div className="absolute top-1 left-[-4px] w-2 h-2 bg-[var(--text-tertiary)] rounded-full" />
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">{post.content}</p>
                    <div className="flex items-center gap-3">
                       {post.achievement && (
                         <Badge variant="primary" size="xs">🏅 Achievement</Badge>
                       )}
                       <span className="text-xs text-[var(--text-tertiary)] font-medium">
                         {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'RECENT'}
                       </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[var(--text-tertiary)] italic">No recent broadcasts.</p>
              )}
            </div>
          </Card>
        </div>

        <div className="pt-8 text-center">
           <Link to="/discovery">
             <Button variant="ghost" leftIcon={<span>&larr;</span>}>Return to Discovery</Button>
           </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

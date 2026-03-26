import React, { memo, useState } from 'react';
import { useFeed } from '../hooks/usePosts';
import Navbar from '../components/Navbar';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';

const AlertCircleIcon = ({ size = 16, className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);

const XIcon = ({ size = 14, className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

const SupportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);

const ConnectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const PostCard = memo(({ post }) => {
  return (
    <Card hover className="mb-6">
      <Card.Header className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] flex items-center justify-center font-bold uppercase shrink-0">
            {post.athleteName ? post.athleteName[0] : <UserIcon />}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">{post.athleteName || 'Verified Athlete'}</h4>
            <p className="text-xs text-[var(--text-secondary)]">
              {post.sport && <span className="mr-2">{post.sport}</span>}
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'RECENT'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="px-2">...</Button>
      </Card.Header>

      <div className="space-y-4">
        <p className="text-sm text-[var(--text-primary)] leading-relaxed">
          {post.content}
        </p>
        
        {post.achievement && (
          <div className="bg-[var(--accent-muted)] border border-[var(--accent-primary)] rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3">
            <span className="text-xl">🏅</span>
            <p className="text-xs font-bold text-[var(--accent-primary)] uppercase">{post.achievement}</p>
          </div>
        )}

        {post.imageUrl && (
          <div className="aspect-video rounded-[var(--radius-md)] overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-base)] mt-4">
            <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}
      </div>

      <Card.Footer>
        <div className="flex items-center gap-4 w-full">
          <Button variant="ghost" size="sm" leftIcon={<SupportIcon />}>Support</Button>
          <Button variant="ghost" size="sm" leftIcon={<ConnectIcon />}>Connect</Button>
        </div>
      </Card.Footer>
    </Card>
  );
});

export default function FeedPage() {
  const { data: posts, isLoading: loading, isError } = useFeed();
  const [errorDismissed, setErrorDismissed] = useState(false);

  const error = isError && !errorDismissed ? "Failed to synchronize feed data. Pulse check your connection." : null;

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <PageHeader 
          title="Community Feed" 
          subtitle="Real-time updates and career milestones from elite verified talent." 
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 max-w-2xl">
            {error && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
                <AlertCircleIcon size={16} className="flex-shrink-0" />
                <span>{error}</span>
                <button onClick={() => setErrorDismissed(true)} className="ml-auto text-red-400/60 hover:text-red-400">
                  <XIcon size={14} />
                </button>
              </div>
            )}

            {loading ? (
              <p className="text-center py-10 text-[var(--text-tertiary)] animate-pulse">Loading feed...</p>
            ) : posts?.length > 0 ? (
              posts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
              <EmptyState
                title="Arena is currently quiet"
                description="Be the first verified athlete to broadcast your professional progress."
                action={<Button>Create Post</Button>}
              />
            )}
          </div>

          <aside className="hidden lg:block w-80 shrink-0 space-y-6">
            <Card>
              <Card.Header><Card.Title>Trending Sports</Card.Title></Card.Header>
              <div className="space-y-4">
                {['Football', 'Athletics', 'Basketball', 'Cricket'].map((sport) => (
                  <div key={sport} className="flex items-center justify-between group cursor-pointer">
                    <span className="text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{sport}</span>
                    <Badge variant="primary" size="xs">PRO</Badge>
                  </div>
                ))}
              </div>
            </Card>
            <Card padding="sm" className="bg-[var(--accent-muted)] border-[var(--accent-primary)] text-center">
              <p className="text-xs font-bold uppercase text-[var(--accent-primary)] p-2">
                Connect with elite scouts by maintaining a premium verified profile.
              </p>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}

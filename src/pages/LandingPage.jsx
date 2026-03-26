import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';

const features = [
  { icon: '🏆', title: 'Tournaments', desc: 'Discover and apply to tournaments nationwide with ease.' },
  { icon: '🔭', title: 'Discovery', desc: 'Advanced filters help scouts and sponsors find top talent.' },
  { icon: '🛡️', title: 'Verified Profiles', desc: 'Admin-verified stats and identity documents for total trust.' },
  { icon: '📝', title: 'Share Updates', desc: 'Post achievements and milestones directly to your feed.' },
];

const stats = [
  { value: '10K+', label: 'Athletes' },
  { value: '500+', label: 'Tournaments' },
  { value: '200+', label: 'Scouts' },
  { value: '98%', label: 'Success' },
];

/**
 * Refactored Landing Page following the strict design system.
 */
export default function LandingPage() {
  return (
    <MainLayout>
      <div className="space-y-24 py-12">
        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center space-y-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            The Future of Sports Discovery
          </div>
          
          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Where Athletes <span className="text-gray-500">Get Discovered.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Connect athletes, scouts, sponsors, and tournaments in one powerful platform.
              Build your verified profile and unlock real opportunities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">Get Started Free</Button>
            </Link>
            <Link to="/discovery">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">Explore Athletes</Button>
            </Link>
          </div>
        </section>

        {/* STATS SECTION */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <Card key={s.label} className="text-center group">
              <p className="text-4xl font-bold text-white mb-1 tracking-tight">{s.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{s.label}</p>
            </Card>
          ))}
        </div>

        {/* FEATURES GRID */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">Everything you need to succeed</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our platform provides the tools for athletes to build their brand and for scouts to find the next star.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} hover className="flex flex-col space-y-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-2xl">
                  {f.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section>
          <Card className="bg-white p-12 md:p-16 text-center space-y-8 border-none overflow-hidden relative">
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight leading-tight">
                Ready to elevate <br /> your professional game?
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Join thousands of elite athletes already building their legacy on Sports Hub.
              </p>
              <Link to="/register" className="inline-block">
                <Button size="lg" className="bg-black text-white hover:bg-neutral-900 border-none px-12">
                  Sign Up Now
                </Button>
              </Link>
            </div>
            {/* Aesthetic background element */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-gray-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-gray-200 rounded-full blur-3xl opacity-50" />
          </Card>
        </section>

        {/* FOOTER */}
        <footer className="pt-12 pb-8 border-t border-neutral-800 text-center">
          <p className="text-gray-500 text-xs font-medium tracking-wide flex items-center justify-center gap-2">
            <span>© 2026 Sports Hub Platform</span>
            <span className="w-1 h-1 rounded-full bg-neutral-700" />
            <span>Built for the elite</span>
          </p>
        </footer>
      </div>
    </MainLayout>
  );
}

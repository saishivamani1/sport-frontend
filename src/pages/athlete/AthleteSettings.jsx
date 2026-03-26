import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useVerificationStatus, useUpdateProfile } from '../../hooks/useVerification';
import Button from '../../components/Button';
import Card from '../../components/Card';

const SPORTS_LIST = [
  'Football', 'Basketball', 'Cricket', 'Tennis', 'Athletics', 
  'Swimming', 'Boxing', 'Kabaddi', 'Badminton', 'Hockey', 'Other'
];

export default function AthleteSettings() {
  const { data: profile, isLoading } = useVerificationStatus();
  const updateProfile = useUpdateProfile();
  
  const [formData, setFormData] = useState({
    sport: '',
    position: '',
    experienceYears: 0
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        sport: profile.sport || '',
        position: profile.position || '',
        experienceYears: profile.experienceYears || 0
      });
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile.mutate(formData);
  };

  if (isLoading) return <DashboardLayout><div className="animate-pulse text-gray-500">Loading profile configuration...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-8 animate-fadeIn">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-white uppercase tracking-tight">Athlete Identity</h1>
          <p className="text-sm text-gray-400">Declare your primary sport and professional role to the community.</p>
        </div>

        <Card className="border-neutral-800 bg-neutral-900/50">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Sport Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Primary Sport</label>
              <select
                value={formData.sport}
                onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all appearance-none"
              >
                <option value="" disabled>Select your sport</option>
                {SPORTS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Position / Role */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Position / Specialty</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="e.g. Striker, Point Guard, Fast Bowler..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Years of Experience</label>
              <input
                type="number"
                min="0"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                loading={updateProfile.isPending}
                className="w-full bg-white text-black hover:bg-neutral-200"
              >
                Save Identity Declaration
              </Button>
            </div>
          </form>
        </Card>

        {/* Info Card */}
        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
             <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <div className="space-y-1">
             <p className="text-sm font-semibold text-blue-400">Identity Persistence</p>
             <p className="text-xs text-gray-400 leading-relaxed">Your declared sport and position are visible to scouts, organizers, and other athletes in the discovery section.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

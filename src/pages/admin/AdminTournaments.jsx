import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useCreateTournament } from '../../hooks/useTournaments';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import toast from 'react-hot-toast';

const SPORTS = ['Football', 'Basketball', 'Cricket', 'Tennis', 'Athletics', 'Swimming', 'Boxing', 'Kabaddi', 'Other'];

const EMPTY_FORM = {
  name: '',
  description: '',
  sport: 'Football',
  location: '',
  startDate: '',
  endDate: '',
  registrationDeadline: '',
  maxParticipants: '',
  prizePool: '',
};

export default function AdminTournaments() {
  const createTournament = useCreateTournament();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Tournament name is required';
    if (!form.location.trim()) e.location = 'Location is required';
    if (!form.startDate) e.startDate = 'Start date is required';
    if (!form.endDate) e.endDate = 'End date is required';
    else if (form.endDate < form.startDate) e.endDate = 'End date must be after start date';
    if (!form.registrationDeadline) e.registrationDeadline = 'Registration deadline is required';
    else if (form.registrationDeadline >= form.startDate) e.registrationDeadline = 'Must be before start date';
    if (form.maxParticipants && Number(form.maxParticipants) < 2) e.maxParticipants = 'Minimum 2 participants';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    createTournament.mutate(
      { ...form, maxParticipants: Number(form.maxParticipants) || null },
      {
        onSuccess: () => {
          toast.success('🏆 Tournament created successfully!');
          setForm(EMPTY_FORM);
        },
        onError: (err) => toast.error(err.response?.data?.message || 'Failed to create tournament'),
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-white uppercase tracking-tight">Event Engineering</h1>
          <p className="text-sm text-gray-400">Deploy a new regional tournament to the discovery grid.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <Card className="p-8 space-y-6">
            <Input
              label="Official Tournament Name"
              required
              placeholder="e.g. National Athletics Championship 2026"
              value={form.name}
              error={errors.name}
              onChange={handleChange('name')}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Detailed Description</label>
              <textarea
                value={form.description}
                onChange={handleChange('description')}
                rows={4}
                placeholder="Outline the event rules, prizes, and specific requirements..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Sport Category</label>
                <select
                  value={form.sport}
                  onChange={handleChange('sport')}
                  className="w-full h-10 px-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all uppercase font-bold tracking-wider"
                >
                  {SPORTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <Input
                label="Held At (Location)"
                required
                placeholder="Mumbai, Regional Hub"
                value={form.location}
                error={errors.location}
                onChange={handleChange('location')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Deployment Date"
                required
                type="date"
                value={form.startDate}
                error={errors.startDate}
                onChange={handleChange('startDate')}
              />
              <Input
                label="Conclusion Date"
                required
                type="date"
                value={form.endDate}
                error={errors.endDate}
                onChange={handleChange('endDate')}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Registration Deadline"
                required
                type="date"
                value={form.registrationDeadline}
                error={errors.registrationDeadline}
                onChange={handleChange('registrationDeadline')}
              />
              <Input
                label="Capacity Limit"
                type="number"
                placeholder="100 Participants"
                value={form.maxParticipants}
                error={errors.maxParticipants}
                onChange={handleChange('maxParticipants')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Prize Pool Allocation"
                placeholder="₹50,000 / Dynamic"
                value={form.prizePool}
                onChange={handleChange('prizePool')}
              />
            </div>

            <div className="pt-4">
              <Button type="submit" loading={createTournament.isPending} className="w-full" size="lg">
                 Deploy Tournament
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  );
}

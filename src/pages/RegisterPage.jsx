import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerApi } from '../api/auth';
import { AuthLayout } from '../layouts/AuthLayout';
import { FormField } from '../components/ui/FormField';
import { Button } from '../components/ui/Button';
import { Divider } from '../components/ui/Divider';
import toast from 'react-hot-toast';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const roles = [
  { value: 'ATHLETE', label: 'Athlete', icon: '🏅' },
  { value: 'SCOUT', label: 'Scout', icon: '🔍' },
  { value: 'SPONSOR', label: 'Sponsor', icon: '🤝' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'ATHLETE' });
  const [errors, setErrors] = useState({});

  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success('Account created successfully!');
      navigate('/login');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Registration failed.'),
  });

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required';
    else if (form.username.length < 3) e.username = 'Username too short';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!EMAIL_REGEX.test(form.email)) e.email = 'Invalid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Min 8 characters required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        name: form.username,
        email: form.email,
        password: form.password,
        role: form.role
      };
      mutation.mutate(payload);
    }
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Create Account</h1>
          <p className="text-sm text-[var(--text-secondary)]">Join the premier sports discovery platform.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="space-y-4">
            <FormField
              label="Username"
              name="username"
              placeholder="e.g. striker07"
              value={form.username}
              error={errors.username}
              onChange={handleChange('username')}
              autoComplete="username"
              required
            />
            <FormField
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              error={errors.email}
              onChange={handleChange('email')}
              autoComplete="email"
              required
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              error={errors.password}
              onChange={handleChange('password')}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--text-primary)]">Select your role <span className="text-[var(--status-error)] ml-1">*</span></label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((r) => {
                const isActive = form.role === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, role: r.value }))}
                    className={`
                      flex flex-col items-center justify-center p-3 rounded-[var(--radius-md)] border transition-all duration-200
                      ${isActive 
                        ? 'bg-[var(--accent-muted)] border-[var(--accent-primary)] text-[var(--accent-primary)]' 
                        : 'bg-[var(--bg-elevated)] border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                      }
                    `}
                  >
                    <span className="text-lg mb-1">{r.icon}</span>
                    <span className="text-xs font-semibold">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Button type="submit" fullWidth loading={mutation.isPending}>
            Get Started
          </Button>
        </form>

        <Divider label="or" />
        <Button variant="secondary" fullWidth onClick={() => toast("Google Auth Placeholder")}>
          Sign up with Google
        </Button>
        <div className="text-center pt-2">
          <p className="text-sm text-[var(--text-secondary)]">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--accent-primary)] font-medium hover:underline underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

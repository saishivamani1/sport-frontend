import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../layouts/AuthLayout';
import { FormField } from '../components/ui/FormField';
import { Button } from '../components/ui/Button';
import { Divider } from '../components/ui/Divider';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const from = location.state?.from?.pathname;

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      const apiResponse = res.data;
      if (!apiResponse.success) {
        toast.error(apiResponse.message || 'Login failed');
        return;
      }
      
      const { accessToken, ...userData } = apiResponse.data;
      login(userData, accessToken);
      toast.success(`Welcome back, ${userData.name || userData.email}!`);
      
      if (from) {
        navigate(from, { replace: true });
      } else if (userData.role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else if (userData.role === 'ATHLETE') {
        navigate('/athlete/dashboard', { replace: true });
      } else {
        navigate('/discovery', { replace: true });
      }
    },
    onError: (err) => {
      console.error('Login error:', err);
      toast.error(err.response?.data?.message || 'Invalid credentials');
    },
  });

  const validate = () => {
    const e = {};
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!EMAIL_REGEX.test(form.email)) e.email = 'Invalid email address';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) mutation.mutate(form);
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Sign In</h1>
          <p className="text-sm text-[var(--text-secondary)]">Enter your credentials to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="space-y-4">
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
              autoComplete="current-password"
              required
            />
          </div>
          <Button type="submit" fullWidth loading={mutation.isPending}>
            Sign In
          </Button>
        </form>
        <Divider label="or" />
        <Button variant="secondary" fullWidth onClick={() => toast("Google Login Placeholder")}>
          Continue with Google
        </Button>
        <div className="text-center pt-2">
          <p className="text-sm text-[var(--text-secondary)]">
            Don't have an account?{' '}
            <Link to="/register" className="text-[var(--accent-primary)] font-medium hover:underline underline-offset-4">
              Join the Arena
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

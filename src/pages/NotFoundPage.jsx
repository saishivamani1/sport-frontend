import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function NotFoundPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-fadeIn relative overflow-hidden">
        {/* Abstract background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative space-y-12">
           <div className="space-y-4">
              <div className="text-[120px] font-black text-white/5 leading-none select-none tracking-tighter">
                404
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl animate-float drop-shadow-2xl">
                📍
              </div>
           </div>

           <div className="space-y-4 max-w-sm mx-auto">
              <h1 className="text-3xl font-bold text-white tracking-tight uppercase">Segment Missing</h1>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                The requested terminal could not be synchronized or has been moved to a different sector. Let's redirect you.
              </p>
           </div>

           <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate(user ? (user.role === 'ADMIN' ? '/admin/dashboard' : '/athlete/dashboard') : '/')} className="w-full sm:w-auto px-10">
                {user ? 'Back to Dashboard' : 'Back to Home'}
              </Button>
           </div>
        </div>
      </div>
    </MainLayout>
  );
}

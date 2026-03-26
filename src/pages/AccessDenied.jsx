import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

export default function AccessDenied() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black">
      <div className="max-w-md w-full animate-fadeIn">
        <Card className="p-12 text-center space-y-8 backdrop-blur-xl bg-neutral-900/50 border-neutral-800 shadow-2xl">
          <div className="space-y-4">
             <span className="text-6xl block mb-6 drop-shadow-2xl">🛡️</span>
             <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                HTTP Code: 403 Restricted
             </div>
             <h1 className="text-3xl font-bold text-white tracking-tight leading-tight uppercase">
                Access Prohibited
             </h1>
             <p className="text-gray-400 text-sm font-medium leading-relaxed">
                You do not possess the necessary clearance to view this secure regional asset. Please contact system administrators.
             </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <Button variant="secondary" className="flex-1" onClick={() => navigate(-1)}>
                Previous Path
             </Button>
             <Link to="/" className="flex-1">
                <Button className="w-full">
                   Return Home
                </Button>
             </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

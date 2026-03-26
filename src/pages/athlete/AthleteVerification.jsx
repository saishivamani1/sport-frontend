import React, { useState, useRef } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useVerificationStatus, useSubmitVerification } from '../../hooks/useVerification';
import Button from '../../components/Button';
import { ProfileSkeleton } from '../../components/LoadingSkeleton';
import Card from '../../components/Card';

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

function StatusBanner({ status, rejectionReason }) {
  const config = {
    VERIFIED: { icon: '✅', title: 'Verified Athlete', desc: 'Your regional identity credentials have been confirmed.', cls: 'text-green-500 border-green-500/20 bg-green-500/5' },
    PENDING_VERIFICATION: { icon: '⏳', title: 'Verification in Progress', desc: 'Our moderation team is reviewing your documents (Estimated: 24h).', cls: 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' },
    REJECTED: { icon: '🚫', title: 'Verification Declined', desc: rejectionReason || 'Information provided was insufficient or illegible.', cls: 'text-red-500 border-red-500/20 bg-red-500/5' },
  };
  const c = config[status];
  if (!c) return null;
  return (
    <Card className={`${c.cls} p-6 animate-fadeIn border`}>
      <div className="flex items-start gap-4">
        <span className="text-2xl pt-0.5">{c.icon}</span>
        <div>
          <p className="font-bold uppercase tracking-widest text-[10px] opacity-80 mb-1">Status</p>
          <p className="text-lg font-semibold text-white tracking-tight leading-none mb-2">{c.title}</p>
          <p className="text-sm opacity-70 font-medium leading-relaxed">{c.desc}</p>
        </div>
      </div>
    </Card>
  );
}

export default function AthleteVerification() {
  const { data: verification, isLoading } = useVerificationStatus();
  const submit = useSubmitVerification();
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState('');

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setFileError('');
    if (!f) return;
    if (!ALLOWED_TYPES.includes(f.type)) {
      setFileError('Invalid format. Please use JPG, PNG, WebP or PDF.');
      return;
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setFileError(`File size exceeds ${MAX_SIZE_MB}MB limit.`);
      return;
    }
    setFile(f);
    if (f.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) { setFileError('Requirement: Identity document is missing.'); return; }
    // Simulate file upload by generating a URL from the file name
    const payload = {
      idProofUrl: `https://cdn.sportstrust.hub/proofs/${file.name}`
    };
    submit.mutate(payload, {
      onSuccess: () => { setFile(null); setPreview(null); },
    });
  };

  const status = verification?.verificationStatus;
  const canSubmit = !status || status === 'REJECTED' || status === 'BASIC';

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fadeIn max-w-2xl">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-white">Verification Center</h1>
          <p className="text-sm text-gray-400">Securely upload your credentials to achieve professional status.</p>
        </div>

        {isLoading ? <ProfileSkeleton /> : (
          <div className="space-y-6">
            <StatusBanner status={status} rejectionReason={verification?.rejectionReason} />

            {canSubmit && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="p-8 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Identity Document</label>
                       <span className="text-[10px] font-bold text-gray-600 uppercase">Max {MAX_SIZE_MB}MB</span>
                    </div>

                    <div
                      className="group relative border-2 border-dashed border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/10 rounded-2xl p-12 text-center cursor-pointer transition-all"
                      onClick={() => fileRef.current?.click()}
                    >
                      {preview ? (
                        <div className="relative inline-block">
                          <img src={preview} alt="Preview" className="max-h-64 rounded-xl border border-neutral-800 shadow-2xl" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity">
                             <span className="text-white text-[10px] font-bold uppercase tracking-widest border border-white/20 px-4 py-2 rounded-lg">Replace File</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-neutral-800 border border-neutral-700 rounded-xl flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                             <svg className="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                             </svg>
                          </div>
                          <div className="space-y-1">
                            <p className="text-white text-sm font-semibold">Select identification file</p>
                            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">PNG, JPG or PDF accepted</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <input
                      ref={fileRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />

                    {file && (
                      <div className="flex items-center gap-4 bg-neutral-800/50 border border-neutral-800 rounded-xl px-4 py-3 animate-slideIn">
                        <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center text-xl shrink-0">
                          {file.type.includes('pdf') ? '📕' : '🖼️'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-bold truncate tracking-tight">{file.name}</p>
                          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button type="button" onClick={() => { setFile(null); setPreview(null); }} className="text-gray-500 hover:text-white transition-colors p-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}

                    {fileError && (
                      <div className="flex items-center gap-2 text-red-500 text-[11px] font-bold bg-red-500/5 px-3 py-2 rounded-lg border border-red-500/10">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                         {fileError}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 bg-neutral-800/30 p-4 rounded-xl border border-neutral-800">
                    <span className="text-xl">🔒</span>
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider leading-relaxed">
                      Encrypted connection. Your data is handled with strict professional standards.
                    </p>
                  </div>

                  <Button type="submit" loading={submit.isPending} className="w-full" size="lg">
                    {submit.isPending ? 'Uploading Data...' : 'Submit Verification Request'}
                  </Button>
                </Card>
              </form>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

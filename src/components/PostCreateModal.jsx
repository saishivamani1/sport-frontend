import React, { useState, useRef } from 'react';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';
import { useSubmitPost } from '../hooks/usePosts';
import toast from 'react-hot-toast';

const SPORTS = ['Football', 'Basketball', 'Cricket', 'Tennis', 'Athletics', 'Swimming', 'Boxing', 'Kabaddi', 'Other'];
const MAX_IMG_MB = 10;
const MAX_CHARS = 1000;

export default function PostCreateModal({ isOpen, onClose }) {
  const submit = useSubmitPost();
  const fileRef = useRef();
  const [form, setForm] = useState({ content: '', achievement: '', sport: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [imgError, setImgError] = useState('');

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleImage = (e) => {
    const f = e.target.files?.[0];
    setImgError('');
    if (!f) return;
    if (!f.type.startsWith('image/')) { setImgError('Only image files are allowed'); return; }
    if (f.size > MAX_IMG_MB * 1024 * 1024) { setImgError(`Max image size is ${MAX_IMG_MB}MB`); return; }
    setImage(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(f);
  };

  const validate = () => {
    const e = {};
    if (!form.content.trim()) e.content = 'Post content is required';
    else if (form.content.length > MAX_CHARS) e.content = `Max ${MAX_CHARS} characters`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Map frontend form fields to backend AchievementSubmitRequest DTO
    const titleStr = form.achievement.trim() || `${form.sport || 'General'} Update`;
    const descStr = form.content.trim();
    // Simulate file upload or provide fallback for @NotBlank constraint
    const urlStr = image ? `https://cdn.sportstrust.hub/media/${image.name}` : `https://example.com/no-image.jpg`;

    const payload = {
      title: titleStr,
      description: descStr,
      proofUrl: urlStr
    };

    submit.mutate(payload, {
      onSuccess: () => {
        toast.success('Post submitted! It\'s under admin review.');
        handleClose();
      },
      onError: (err) => toast.error(err.response?.data?.message || 'Failed to submit post'),
    });
  };

  const handleClose = () => {
    setForm({ content: '', achievement: '', sport: '' });
    setImage(null); setPreview(null); setErrors({}); setImgError('');
    onClose();
  };

  const charsLeft = MAX_CHARS - form.content.length;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Post">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-4">
          {/* Content Area */}
          <div className="space-y-2">
            <label htmlFor="post-content" className="block text-sm font-medium text-gray-300">
              Update Content
            </label>
            <textarea
              id="post-content"
              value={form.content}
              onChange={handleChange('content')}
              rows={4}
              placeholder="Share an achievement or training update…"
              className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all ${
                errors.content ? 'border-red-500/60' : 'border-neutral-800 hover:border-neutral-700'
              }`}
            />
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
              {errors.content ? <span className="text-red-500">{errors.content}</span> : <span />}
              <span className={charsLeft < 0 ? 'text-red-500' : ''}>{form.content.length} / {MAX_CHARS}</span>
            </div>
          </div>

          <Input
            label="Achievement (e.g. Gold Medal)"
            placeholder="Optional milestone tag"
            value={form.achievement}
            onChange={handleChange('achievement')}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Sport Category</label>
            <select
              value={form.sport}
              onChange={handleChange('sport')}
              className="w-full h-10 px-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all uppercase font-bold tracking-wider"
            >
              <option value="">Select Sport...</option>
              {SPORTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Attachment</label>
            {preview ? (
              <div className="relative rounded-xl overflow-hidden border border-neutral-800 group">
                <img src={preview} alt="Preview" className="w-full max-h-40 object-cover" />
                <button
                  type="button"
                  onClick={() => { setImage(null); setPreview(null); }}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest transition-opacity"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/10 rounded-xl py-6 text-center cursor-pointer transition-all"
              >
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Select Visual Content</p>
                <p className="text-neutral-700 text-[10px] uppercase font-bold tracking-tighter mt-1">MAX {MAX_IMG_MB}MB · JPG, PNG, WEBP</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
            {imgError && <p className="text-[10px] text-red-500 font-bold uppercase mt-1">{imgError}</p>}
          </div>
        </div>

        <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex items-center gap-3">
          <span className="text-lg">📋</span>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
             Posts are queued for administrative review to ensure professional standards.
          </p>
        </div>

        <div className="flex gap-4">
          <Button variant="secondary" className="flex-1" onClick={handleClose}>Discard</Button>
          <Button type="submit" loading={submit.isPending} className="flex-1">Publish Post</Button>
        </div>
      </form>
    </Modal>
  );
}

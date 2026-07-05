import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { Instagram, Linkedin, Music2, Check, SendHorizontal } from 'lucide-react';
import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';

const services = [
  'Videography',
  'Concept Development',
  'Content Creation',
  'Brand Strategy',
  'Presence / Modeling',
  'Creative Direction'
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [briefFile, setBriefFile] = useState<File | null>(null);

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set('form-name', 'inquiry');
    data.set('services', selectedServices.join(', '));
    if (briefFile) data.set('brief', briefFile);

    try {
      const res = await fetch('/', { method: 'POST', body: data });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setSelectedServices([]);
      setBriefFile(null);
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 pb-40">
      <SEO title="Contact" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-40 items-start pt-20">
        {/* Left Side: Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-16 relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute -left-16 -top-10 pointer-events-none"
          >
            <SendHorizontal size={140} strokeWidth={0.5} />
          </motion.div>
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-serif italic leading-tight">
              Let’s build something intentional.
            </h1>
            <p className="text-brand-muted text-lg font-light leading-relaxed opacity-60 max-w-md">
              Reach out to exchange ideas, collaborate, or connect.
            </p>
          </div>

          <div className="space-y-12">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-semibold">Direct Inquiry</p>
              <a
                href="mailto:siwandewongani@gmail.com"
                className="text-2xl md:text-3xl font-light hover:italic transition-all duration-500 block"
              >
                siwandewongani@gmail.com
              </a>
            </div>

            <div className="flex space-x-12 pt-8">
              <a href="https://www.instagram.com/wonganisiwande/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center space-y-4 opacity-40 hover:opacity-100 transition-all">
                <Instagram size={20} strokeWidth={1.5} />
                <span className="text-[9px] uppercase tracking-[0.2em]">Instagram</span>
              </a>
              <a href="https://www.tiktok.com/@wongani.siwande" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center space-y-4 opacity-40 hover:opacity-100 transition-all">
                <Music2 size={20} strokeWidth={1.5} />
                <span className="text-[9px] uppercase tracking-[0.2em]">TikTok</span>
              </a>
              <a href="https://www.linkedin.com/in/wongani-siwande-/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center space-y-4 opacity-40 hover:opacity-100 transition-all">
                <Linkedin size={20} strokeWidth={1.5} />
                <span className="text-[9px] uppercase tracking-[0.2em]">LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Quotation Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="bg-brand-ink/[0.02] border border-brand-ink/5 p-8 md:p-12 backdrop-blur-sm"
        >
          <h2 className="text-[11px] uppercase tracking-[0.3em] font-semibold mb-12 opacity-40">Request a Quotation</h2>

          <form
            name="inquiry"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-10"
          >
            {/* Netlify Forms: identifies the submission + silent spam honeypot */}
            <input type="hidden" name="form-name" value="inquiry" />
            <p className="hidden">
              <label>Leave this empty: <input name="bot-field" /></label>
            </p>

            <div className="space-y-6">
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-40">Select Services</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`
                      flex items-center justify-between px-6 py-4 border transition-all duration-500 text-left
                      ${selectedServices.includes(service)
                        ? 'bg-brand-ink text-brand-bg border-brand-ink'
                        : 'border-brand-ink/10 hover:border-brand-ink/30'}
                    `}
                  >
                    <span className="text-xs uppercase tracking-wider">{service}</span>
                    {selectedServices.includes(service) && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.2em] opacity-40 ml-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-brand-ink/10 py-3 focus:border-brand-ink outline-none transition-colors font-light"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.2em] opacity-40 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-brand-ink/10 py-3 focus:border-brand-ink outline-none transition-colors font-light"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <FileUpload accept=".pdf" onFileSelect={setBriefFile} />

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.2em] opacity-40 ml-1">Project Details</label>
              <textarea
                name="message"
                rows={4}
                className="w-full bg-transparent border-b border-brand-ink/10 py-3 focus:border-brand-ink outline-none transition-colors font-light resize-none"
                placeholder="Tell me about your vision..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="w-full bg-brand-ink text-brand-bg py-6 uppercase tracking-[0.3em] text-[11px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Request Sent' : 'Submit Request'}
            </button>

            <AnimatePresence>
              {status === 'sent' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] uppercase tracking-[0.2em] text-center opacity-60 italic"
                >
                  Thank you. I will be in touch shortly.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] uppercase tracking-[0.2em] text-center text-red-500/80"
                >
                  Something went wrong. Please email siwandewongani@gmail.com directly.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>

      {/* Floating Background Element */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.01, 0.02, 0.01]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-ink rounded-full blur-[150px]"
        />
      </div>
    </div>
  );
}

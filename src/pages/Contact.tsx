import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { Instagram, Linkedin, Music2, Check, SendHorizontal, FileText, MessageCircle, ArrowRight, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FileUpload from '../components/FileUpload';

type Service = {
  name: string;
  value: string;
  ask: string;
  sample: { to: string; label: string };
};

// Each service says what it includes, what to send so we skip the back and forth,
// and links to visual proof.
const services: Service[] = [
  {
    name: 'Creative Direction',
    value: 'Concept to final frame: the idea, look order, shot list, grade and pace.',
    ask: 'Send what you are making, where it will live, and your date.',
    sample: { to: '/thoughts/the-amaryllis-editorial', label: 'The Amaryllis Editorial' }
  },
  {
    name: 'Videography',
    value: 'Shot and edited films with one warm grade, cut for IG and TikTok.',
    ask: 'Send the story you want told, the location, and your timeline.',
    sample: { to: '/presence', label: 'The Resident' }
  },
  {
    name: 'Content Creation',
    value: 'Short form series built to a repeatable format your audience returns for.',
    ask: 'Send your platform, your goal, and how often you want to post.',
    sample: { to: '/presence', label: 'Sambas, Three Ways' }
  },
  {
    name: 'Concept Development',
    value: 'Campaign and series concepts with hooks, arcs and a reason to exist.',
    ask: 'Send your product and who it is for. I will bring the idea.',
    sample: { to: '/experiments', label: 'The Bachelor series' }
  },
  {
    name: 'Brand Strategy',
    value: 'Positioning, content pillars and a plan your team can actually run.',
    ask: 'Send where the brand is now and where you want it to be.',
    sample: { to: '/experiments', label: 'Selected case studies' }
  },
  {
    name: 'Presence / Modeling',
    value: 'Editorial and campaign presence, directed or in front of the lens.',
    ask: 'Send the campaign concept, usage, and dates.',
    sample: { to: '/presence', label: 'Denim in Bloom' }
  }
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

const WHATSAPP = 'https://wa.me/265884243161?text=' + encodeURIComponent(
  'Hi Wongani, I found you through wonganisiwande.com. I am interested in: '
);

export default function Contact() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [briefFile, setBriefFile] = useState<File | null>(null);
  const [showCurrency, setShowCurrency] = useState(false);

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
      <SEO
        title="Contact"
        description="Book creative direction, videography, content, brand strategy or presence. Rate card available. Blantyre, Malawi and beyond."
      />

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
              Tell me what you are building and I will tell you exactly how I can help. The clearer the brief, the faster the yes.
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

            {/* Rate card + WhatsApp — the two fastest paths to a booking */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => setShowCurrency(true)}
                className="flex items-center justify-center gap-3 border border-brand-ink/15 hover:border-brand-ink px-8 py-5 text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors duration-500"
              >
                <FileText size={15} strokeWidth={1.5} />
                <span>View the 2026 rate card</span>
              </button>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-brand-ink text-brand-bg px-8 py-5 text-[10px] uppercase tracking-[0.25em] font-semibold hover:opacity-90 transition-opacity duration-500"
              >
                <MessageCircle size={15} strokeWidth={1.5} />
                <span>WhatsApp me</span>
              </a>
            </div>

            {/* Currency chooser for the rate card */}
            <AnimatePresence>
              {showCurrency && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="fixed inset-0 z-[90] bg-brand-bg/98 backdrop-blur-md flex items-center justify-center px-6"
                  onClick={() => setShowCurrency(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-md border border-brand-ink/10 bg-brand-bg p-10 md:p-12 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setShowCurrency(false)}
                      aria-label="Close"
                      className="absolute top-4 right-4 p-2 opacity-40 hover:opacity-100 transition-opacity"
                    >
                      <X size={18} strokeWidth={1.2} />
                    </button>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40 mb-3">2026 Rate Card</p>
                    <h3 className="text-2xl font-serif mb-8">Pick your currency.</h3>
                    <div className="space-y-4">
                      <a
                        href="/rate-card-mwk.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowCurrency(false)}
                        className="flex items-baseline justify-between border border-brand-ink/15 hover:border-brand-ink px-6 py-5 transition-colors duration-500 group"
                      >
                        <span className="text-xs uppercase tracking-[0.2em] font-semibold">MWK</span>
                        <span className="text-[10px] uppercase tracking-[0.15em] opacity-40 group-hover:opacity-70 transition-opacity">Malawi Kwacha</span>
                      </a>
                      <a
                        href="/rate-card-usd.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowCurrency(false)}
                        className="flex items-baseline justify-between border border-brand-ink/15 hover:border-brand-ink px-6 py-5 transition-colors duration-500 group"
                      >
                        <span className="text-xs uppercase tracking-[0.2em] font-semibold">USD</span>
                        <span className="text-[10px] uppercase tracking-[0.15em] opacity-40 group-hover:opacity-70 transition-opacity">International</span>
                      </a>
                    </div>
                    <p className="text-[10px] font-light leading-relaxed opacity-40 mt-8">
                      Same services either way. 50% books the date, balance on delivery.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex space-x-12 pt-4">
              <a href="https://www.instagram.com/wonganisiwande/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center space-y-4 opacity-40 hover:opacity-100 transition-all">
                <Instagram size={20} strokeWidth={1.5} />
                <span className="text-[9px] uppercase tracking-[0.2em]">Instagram</span>
              </a>
              <a href="https://www.tiktok.com/@wonganisiwande" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center space-y-4 opacity-40 hover:opacity-100 transition-all">
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
          <h2 className="text-[11px] uppercase tracking-[0.3em] font-semibold mb-4 opacity-40">Request a Quotation</h2>
          <p className="text-sm font-light leading-relaxed opacity-50 mb-10">
            Pick a service to see what it includes and what to send. Each one links to a finished example, so you know what you are buying before we talk.
          </p>

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
              <div className="grid grid-cols-1 gap-4">
                {services.map((service) => {
                  const active = selectedServices.includes(service.name);
                  return (
                    <div
                      key={service.name}
                      className={`
                        border transition-all duration-500
                        ${active ? 'border-brand-ink/60 bg-brand-ink/[0.03]' : 'border-brand-ink/10 hover:border-brand-ink/30'}
                      `}
                    >
                      <button
                        type="button"
                        onClick={() => toggleService(service.name)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left"
                      >
                        <span className="text-xs uppercase tracking-wider font-medium">{service.name}</span>
                        <span className={`flex items-center justify-center w-5 h-5 border transition-all duration-300 ${active ? 'bg-brand-ink border-brand-ink text-brand-bg' : 'border-brand-ink/20'}`}>
                          {active && <Check size={12} />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 space-y-3">
                              <p className="text-sm font-light leading-relaxed opacity-70">{service.value}</p>
                              <p className="text-[11px] font-light leading-relaxed text-brand-muted">
                                <span className="uppercase tracking-[0.15em] font-medium opacity-70">To quote you fast: </span>
                                {service.ask}
                              </p>
                              <Link
                                to={service.sample.to}
                                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-accent hover:opacity-70 transition-opacity"
                              >
                                <span>See it done: {service.sample.label}</span>
                                <ArrowRight size={12} />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
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
                placeholder="Your goal, your dates, your budget range if you have one..."
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

      {/* Static background wash. Was an infinitely animating 150px blur, which
          cost real frame time on phones and made the page feel sluggish. */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-ink opacity-[0.015] rounded-full blur-[150px]" />
      </div>
    </div>
  );
}

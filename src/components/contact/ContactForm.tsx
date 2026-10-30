'use client';

import { useRef, useState } from 'react';
import { animate } from 'animejs';
import { contactPage } from '@/content/company';
import { contact } from '@/content/site';
import { EASE, reducedMotion } from '@/lib/motion';
import { Arrow } from '@/components/chrome/Nav';

const f = contactPage.form;
type Status = 'idle' | 'sending' | 'sent' | 'fallback' | 'error';

/**
 * The enquiry form (fields as on the live contact page). Posts to /api/contact; if delivery isn't configured or
 * fails, it opens the visitor's email app with the enquiry pre-filled to contactus@solutionbowl.com.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [need, setNeed] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries()) as Record<string, string | boolean>;
    body.nda = fd.get('nda') === 'on';
    setStatus('sending');
    setErrors({});
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus('sent');
        formRef.current?.reset();
        setNeed('');
        requestAnimationFrame(() => {
          doneRef.current?.focus();
          if (doneRef.current && !reducedMotion()) animate(doneRef.current, { opacity: [0, 1], translateY: [16, 0], duration: 700, ease: EASE.out });
        });
        return;
      }
      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        setStatus('idle');
        const first = Object.keys(json.errors)[0];
        formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        return;
      }
      if (json.fallback === 'email') {
        openEmail(body);
        setStatus('fallback');
        return;
      }
      setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  function openEmail(b: Record<string, string | boolean>) {
    const lines = [
      `Name: ${b.name}`,
      `Email: ${b.email}`,
      `Company: ${b.company}`,
      b.role ? `Role: ${b.role}` : '',
      `Phone: ${b.phone}`,
      `Need: ${b.need}`,
      `Project scale: ${b.scale}`,
      `Timeline: ${b.timeline}`,
      b.nda ? 'Please send an NDA before starting.' : '',
      '',
      String(b.message ?? ''),
    ].filter((l) => l !== '');
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Project enquiry — ${b.company || b.name}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  if (status === 'sent')
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="rounded-[var(--radius-lg)] bg-ink p-8 text-paper outline-none">
        <span aria-hidden className="grid size-14 place-items-center rounded-full bg-orange text-ink">
          <svg width="22" height="22" viewBox="0 0 22 22">
            <path d="m5 11.5 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="display mt-8 text-5xl">Thank you.</p>
        <p className="mt-3 max-w-md text-paper/75">Your enquiry has been sent. {f.subtitle}</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-8 text-sm font-semibold text-orange underline-offset-4 hover:underline">
          Send another enquiry
        </button>
      </div>
    );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-[var(--radius-lg)] bg-paper p-[clamp(1.25rem,3vw,2.5rem)] shadow-[0_30px_60px_-40px_rgb(60_30_5/0.5)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="display text-[clamp(1.8rem,1.26rem+1.62vw,2.7rem)]">{f.title}</h2>
          <p className="mt-1 text-sm text-ink-2">{f.subtitle}</p>
        </div>
      </div>

      <fieldset className="mt-8">
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-2">What do you need? *</legend>
        <div className="flex flex-wrap gap-2">
          {f.needs.map((n) => (
            <label key={n} className={`tag cursor-pointer py-2.5 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-orange-deep ${need === n ? 'bg-ink text-paper' : 'border border-[var(--line-strong)] hover:bg-cream'}`}>
              <input type="radio" name="need" value={n} className="sr-only" checked={need === n} onChange={() => setNeed(n)} aria-invalid={!!errors.need} />
              {n}
            </label>
          ))}
        </div>
        {errors.need && <ErrorText>{errors.need}</ErrorText>}
      </fieldset>

      <div className="mt-6 grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" error={errors.name} />
        <Field label="Work email" name="email" type="email" required autoComplete="email" error={errors.email} />
        <Field label="Company" name="company" required autoComplete="organization" error={errors.company} />
        <Select label="Your role" name="role" options={f.roles} error={errors.role} />
        <Field label="Phone number" name="phone" type="tel" required autoComplete="tel" placeholder="+91" error={errors.phone} />
        <Select label="Project scale" name="scale" options={f.scales} required error={errors.scale} />
        <Select label="Timeline" name="timeline" options={f.timelines} required error={errors.timeline} />
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-2">
            A line about your project
          </label>
          <textarea id="message" name="message" rows={4} maxLength={5000} className="w-full resize-y rounded-2xl border border-[var(--line-strong)] bg-cream/50 px-4 py-3 outline-none transition-colors focus:border-ink focus:bg-white" />
        </div>
      </div>
      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-cream p-4">
        <input type="checkbox" name="nda" className="mt-1 size-4 accent-[var(--color-orange-deep)]" />
        <span>
          <span className="block font-semibold">Send me an NDA before starting</span>
          <span className="text-sm text-ink-2">We&apos;ll include it in our first reply.</span>
        </span>
      </label>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-sm text-xs text-ink-2">Your information is 100% confidential. We sign NDA before any discussion. No spam, ever.</p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pl-6 pr-1.5 font-semibold text-paper transition-colors hover:bg-ink-hover disabled:opacity-60"
        >
          <span className="py-1.5">{status === 'sending' ? 'Sending…' : 'Schedule a Discovery Call'}</span>
          <span className="grid size-9 place-items-center rounded-full bg-orange text-ink transition-transform duration-500 group-hover:-rotate-45">
            <Arrow />
          </span>
        </button>
      </div>
      <div aria-live="polite" className="mt-4 text-sm">
        {status === 'fallback' && (
          <p className="rounded-xl bg-cream-2 p-4">
            We&apos;ve opened your email app with your enquiry filled in — just press send. If nothing opened, write to{' '}
            <a className="font-semibold text-orange-deep underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>{' '}
            or message us on{' '}
            <a className="font-semibold text-orange-deep underline" href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            .
          </p>
        )}
        {status === 'error' && (
          <p className="rounded-xl bg-orange-soft p-4">
            Something went wrong sending your enquiry. Please email{' '}
            <a className="font-semibold underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

function ErrorText({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-orange-deep">
      {children}
    </p>
  );
}

function Field({ label, name, type = 'text', required, autoComplete, placeholder, error }: { label: string; name: string; type?: string; required?: boolean; autoComplete?: string; placeholder?: string; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-2">
        {label}
        {required && ' *'}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-full border border-[var(--line-strong)] bg-cream/50 px-5 py-3 outline-none transition-colors focus:border-ink focus:bg-white aria-[invalid=true]:border-orange-deep"
      />
      {error && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </div>
  );
}

function Select({ label, name, options, required, error }: { label: string; name: string; options: string[]; required?: boolean; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-2">
        {label}
        {required && ' *'}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full appearance-none rounded-full border border-[var(--line-strong)] bg-cream/50 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%2210%22><path d=%22M1.5 3.5 5 7l3.5-3.5%22 fill=%22none%22 stroke=%22%231c1916%22 stroke-width=%221.5%22/></svg>')] bg-[length:10px] bg-[right_1.25rem_center] bg-no-repeat px-5 py-3 outline-none transition-colors focus:border-ink focus:bg-white aria-[invalid=true]:border-orange-deep"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {error && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </div>
  );
}

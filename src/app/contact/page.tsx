import type { Metadata } from 'next';
import Lines from '@/components/ui/Lines';
import SectionHead from '@/components/ui/SectionHead';
import Button from '@/components/ui/Button';
import Testimonials from '@/components/home/Testimonials';
import ContactForm from '@/components/contact/ContactForm';
import { contactPage } from '@/content/company';
import { contact, offices, socials } from '@/content/site';
import { toLines } from '@/lib/text';
import { Arrow } from '@/components/chrome/Nav';

export const metadata: Metadata = {
  title: contactPage.meta.title,
  description: contactPage.meta.description,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const c = contactPage;
  return (
    <>
      <section className="relative overflow-hidden pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--header-h)+clamp(2rem,5vw,4rem))]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-50 [mask-image:radial-gradient(90%_70%_at_100%_0%,#000_10%,transparent_60%)]" />
        <div className="wrap relative">
          <p className="eyebrow mb-6 text-ink-2" data-reveal>
            {c.hero.eyebrow}
          </p>
          <Lines as="h1" lines={[...toLines(c.hero.title[0], 14), ...toLines(c.hero.title[1], 20)]} className="display text-[clamp(2.03rem,0.63rem+4.62vw,6.13rem)]" lineClassName={(i) => (i >= toLines(c.hero.title[0], 14).length ? 'text-orange-ink' : '')} />
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="lede max-w-xl lg:col-span-6" data-reveal>
              {c.hero.lede}
            </p>
            <ul className="flex flex-wrap gap-2 lg:col-span-6 lg:justify-end" data-stagger>
              {c.hero.badges.map((b) => (
                <li key={b} className="tag bg-ink py-2.5 text-paper">
                  <span aria-hidden className="size-1.5 rounded-full bg-orange" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contact-form" aria-label="Contact form" className="scroll-mt-24 pb-[var(--section)]">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <aside className="space-y-4 lg:col-span-5" aria-label="Other ways to reach us">
            <div className="rounded-[var(--radius-lg)] bg-orange p-7" data-reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">Prefer to write?</p>
              <a href={`mailto:${contact.email}`} className="display-soft mt-4 block text-[clamp(1.35rem,0.95rem+1.08vw,1.98rem)] hover:underline">
                {contact.email}
              </a>
              <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 font-semibold hover:underline">
                WhatsApp {contact.whatsapp.label} <Arrow className="-rotate-45" />
              </a>
              <p className="mt-6 border-t border-ink/20 pt-4 text-sm">{contact.responseTime}</p>
            </div>
            <div className="rounded-[var(--radius-lg)] bg-ink p-7 text-paper" data-reveal data-reveal-delay="100">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange">{c.form.ndaTitle}</p>
              <ul className="mt-4 space-y-3">
                {c.form.ndaPoints.map((p) => (
                  <li key={p} className="flex gap-3 text-paper/85">
                    <span aria-hidden className="mt-2.5 size-1.5 flex-none rounded-full bg-orange" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2" data-reveal data-reveal-delay="200">
              {offices.map((o) => (
                <address key={o.city} className="rounded-[var(--radius-lg)] bg-paper p-6 not-italic">
                  <span className="display-soft block text-xl">{o.city}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink-2">
                    {o.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                </address>
              ))}
            </div>
            <ul className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="tag border border-[var(--line-strong)] bg-paper py-2.5 hover:bg-cream-2">
                    {s.label} <Arrow className="-rotate-45" />
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section aria-label="At a glance" className="pb-[var(--section)]">
        <dl className="wrap grid grid-cols-2 border-y border-ink lg:grid-cols-4" data-stagger>
          {c.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-2 p-6 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-[var(--line)]">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-2">{s.label}</dt>
              <dd className="display text-[clamp(2.18rem,1.4rem+2.34vw,4.29rem)] leading-[0.9]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="steps" className="pb-[var(--section)]">
        <div className="wrap">
          <SectionHead id="steps" eyebrow={c.steps.eyebrow} title={toLines(c.steps.title, 24)} accentLine={toLines(c.steps.title, 24).length - 1} intro={c.steps.intro} size="h3" />
          <ol className="mt-12 grid gap-4 md:grid-cols-3" data-stagger>
            {c.steps.items.map((s, i) => (
              <li key={s.title} className={`flex min-h-64 flex-col justify-between rounded-[var(--radius-lg)] p-7 ${i === 1 ? 'bg-orange' : i === 2 ? 'bg-ink text-paper' : 'bg-paper'}`}>
                <span className="display text-7xl leading-none">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="display-soft block text-2xl">{s.title}</span>
                  <span className={`mt-2 block ${i === 2 ? 'text-paper/75' : i === 1 ? '' : 'text-ink-2'}`}>{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="why-choose" className="pb-[var(--section)]">
        <div className="wrap">
          <SectionHead id="why-choose" eyebrow={c.why.eyebrow} title={toLines(c.why.title, 22)} accentLine={toLines(c.why.title, 22).length - 1} intro={c.why.intro} size="h3" />
          <ol className="mt-12 border-t border-ink" data-stagger>
            {c.why.items.map((it, i) => (
              <li key={it.title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-6 gap-y-2 border-b border-ink py-7 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)]">
                <span className="text-sm font-semibold tabular-nums text-ink-2">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display text-[clamp(1.53rem,0.99rem+1.62vw,2.52rem)]">{it.title}</h3>
                <p className="col-start-2 text-ink-2 md:col-start-3">{it.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Testimonials items={c.reviews.items} eyebrow={c.reviews.rating ?? c.reviews.eyebrow} title={c.reviews.title} />

      <section aria-labelledby="ready" className="pb-[var(--section)] text-center">
        <div className="wrap">
          <p className="eyebrow mx-auto mb-6 flex w-fit text-ink-2">{c.cta.eyebrow}</p>
          <Lines id="ready" lines={toLines(c.cta.title, 20)} className="display mx-auto text-[length:var(--fs-h1)]" lineClassName={(i) => (i === 1 ? 'text-orange-ink' : '')} />
          <p className="lede mx-auto mt-6 max-w-2xl" data-reveal>
            {c.cta.body}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3" data-reveal>
            <Button href="#contact-form">{c.cta.primary}</Button>
            <Button href={contact.whatsapp.href} variant="ghost">
              {c.cta.secondary}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

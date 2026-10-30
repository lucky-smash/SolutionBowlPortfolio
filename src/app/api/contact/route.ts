import { NextResponse } from 'next/server';
import { contactPage } from '@/content/company';

/**
 * Contact form endpoint. Validates the enquiry and forwards it as JSON to CONTACT_WEBHOOK_URL (any HTTPS endpoint:
 * a CRM, Zapier/Make hook, Slack incoming webhook, serverless mailer…). Without that variable the endpoint answers
 * 503 and the form falls back to a pre-filled email, so no enquiry is silently dropped.
 */
const f = contactPage.form;
const MAX = { short: 200, message: 5000 };

type Body = Record<string, unknown>;
const str = (b: Body, k: string, max = MAX.short) => (typeof b[k] === 'string' ? (b[k] as string).trim().slice(0, max) : '');

export async function POST(req: Request) {
  let b: Body;
  try {
    b = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  // Honeypot: real visitors never see or fill this field.
  if (str(b, 'website')) return NextResponse.json({ ok: true });

  const data = {
    name: str(b, 'name'),
    email: str(b, 'email'),
    company: str(b, 'company'),
    role: str(b, 'role'),
    phone: str(b, 'phone', 40),
    need: str(b, 'need'),
    scale: str(b, 'scale'),
    timeline: str(b, 'timeline'),
    message: str(b, 'message', MAX.message),
    nda: b.nda === true,
  };
  const errors: Record<string, string> = {};
  if (!data.name) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (!data.company) errors.company = 'Please enter your company.';
  if (!/^[+\d][\d\s()-]{6,}$/.test(data.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!f.needs.includes(data.need)) errors.need = 'Please choose what you need.';
  if (!f.scales.includes(data.scale)) errors.scale = 'Please choose a project scale.';
  if (!f.timelines.includes(data.timeline)) errors.timeline = 'Please choose a timeline.';
  if (data.role && !f.roles.includes(data.role)) errors.role = 'Please choose a role from the list.';
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) return NextResponse.json({ ok: false, fallback: 'email' }, { status: 503 });

  try {
    const res = await fetch(hook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ source: 'solutionbowl.ai/contact', receivedAt: new Date().toISOString(), ...data }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[contact] delivery failed', e);
    return NextResponse.json({ ok: false, fallback: 'email' }, { status: 502 });
  }
}

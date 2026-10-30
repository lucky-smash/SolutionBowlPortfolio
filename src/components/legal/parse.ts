import type { LegalPage } from '@/content/types';

// The legal content stores each section as paragraphs + bullets, with tables flattened to " — "-joined bullet rows
// announced by a "Columns: A — B" paragraph. These helpers put the pieces back in reading order and rebuild the
// tables, without changing any of the text.

const SEP = ' — ';

export type Piece =
  | { kind: 'p'; text: string }
  | { kind: 'callout'; label: string; text: string }
  | { kind: 'caption'; text: string }
  | { kind: 'card'; lines: string[] }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'terms'; items: { term: string; text: string }[] }
  | { kind: 'groups'; groups: { term: string; items: string[] }[] }
  | { kind: 'list'; items: string[] };

/** Short line without closing punctuation: a box title or an address line. */
const isLabel = (t: string) => t.length <= 90 && !/[.!?:;]$/.test(t) && !t.startsWith('Columns:');

/** "Plain English Summary: …" style notices (a label of at most four words). */
function callout(t: string) {
  const m = /^([A-Z][A-Za-z-]*(?: [A-Za-z-]+){0,3}):\s(.{40,})$/.exec(t);
  return m ? { label: m[1], text: m[2] } : null;
}

function listPieces(bullets: string[], columns: string[] | null): Piece[] {
  const out: Piece[] = [];
  const split = bullets.map((b) => b.split(SEP));
  if (columns) {
    const rows = split.filter((r) => r.length === columns.length);
    const rest = bullets.filter((_, i) => split[i].length !== columns.length);
    if (rows.length) out.push({ kind: 'table', head: columns, rows });
    for (const r of rest) {
      const c = callout(r);
      out.push(c ? { kind: 'callout', ...c } : { kind: 'p', text: r });
    }
    return out;
  }
  if (split.every((r) => r.length === 2)) {
    const terms = split.map(([term, text]) => ({ term, text }));
    // Several rows sharing a term ("You May — …", "You Must Not — …") read better as grouped lists.
    if (new Set(terms.map((t) => t.term)).size < terms.length) {
      const groups: { term: string; items: string[] }[] = [];
      for (const t of terms) {
        const g = groups.find((x) => x.term === t.term);
        if (g) g.items.push(t.text);
        else groups.push({ term: t.term, items: [t.text] });
      }
      return [{ kind: 'groups', groups }];
    }
    return [{ kind: 'terms', items: terms }];
  }
  return [{ kind: 'list', items: bullets }];
}

export function sectionPieces(s: LegalPage['sections'][number]): Piece[] {
  const paras = s.paragraphs ?? [];
  const bullets = s.bullets ?? [];
  let columns: string[] | null = null;

  // The list follows the last paragraph that introduces it ("…:" or "Columns: …"), plus any box title right after.
  let at = -1;
  paras.forEach((p, i) => {
    if (p.startsWith('Columns:') || p.endsWith(':')) at = i;
  });
  if (bullets.length && at === -1) at = paras.length - 1;
  while (bullets.length && at + 1 < paras.length && isLabel(paras[at + 1])) at++;

  const out: Piece[] = [];
  const text = (p: string, i: number) => {
    if (p.startsWith('Columns:')) {
      columns = p.slice('Columns:'.length).trim().split(SEP);
      return;
    }
    const c = callout(p);
    if (c) out.push({ kind: 'callout', ...c });
    else if (bullets.length && isLabel(p) && i <= at) out.push({ kind: 'caption', text: p });
    else out.push({ kind: 'p', text: p });
  };

  for (let i = 0; i <= at && i < paras.length; i++) text(paras[i], i);
  if (bullets.length) out.push(...listPieces(bullets, columns));
  for (let i = Math.max(at + 1, 0); i < paras.length; i++) text(paras[i], i);

  // Runs of two or more short lines (a postal address, for example) become one card.
  const merged: Piece[] = [];
  for (const p of out) {
    const prev = merged[merged.length - 1];
    if (p.kind === 'p' && isLabel(p.text)) {
      if (prev?.kind === 'card') prev.lines.push(p.text);
      else merged.push({ kind: 'card', lines: [p.text] });
    } else merged.push(p);
  }
  return merged.map((p) => (p.kind === 'card' && p.lines.length === 1 ? { kind: 'p', text: p.lines[0] } : p));
}

/** Intro lines: the first is the standfirst; "Label: value" facts and short promises are pulled out of the prose. */
export function introParts(intro: string[] = []) {
  const [lede, ...rest] = intro;
  const facts: { label: string; value: string }[] = [];
  const badges: string[] = [];
  const paragraphs: string[] = [];
  for (const t of rest) {
    const m = /^([A-Z][A-Za-z ]{1,24}):\s(.{1,48})$/.exec(t);
    if (m) facts.push({ label: m[1], value: m[2] });
    else if (isLabel(t) && t.length <= 60) badges.push(t);
    else paragraphs.push(t);
  }
  return { lede, facts, badges, paragraphs };
}

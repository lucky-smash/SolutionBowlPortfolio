import type { ReactNode } from 'react';
import type { Block } from '@/content/types';
import { headings } from './utils';

/** "Label: rest" list items get their label set in bold (the text itself is unchanged). */
function labelled(text: string): ReactNode {
  const m = /^([^:]{2,40}):\s+(.+)$/.exec(text);
  if (!m) return text;
  return (
    <>
      <strong className="font-semibold text-ink">{m[1]}:</strong> {m[2]}
    </>
  );
}

/** The long-form reading column: post blocks rendered in the site's type system, h2s anchored for the contents. */
export default function ArticleBody({ body }: { body: Block[] }) {
  const ids = headings(body).map((h) => h.id);
  let h2 = 0;
  return (
    <div className="article max-w-[62ch] text-[1.125rem] leading-[1.75] text-ink-2">
      {body.map((b, i) => {
        switch (b.type) {
          case 'h2': {
            const id = ids[h2];
            const n = ++h2;
            return (
              <h2 key={i} id={id} className="mb-6 mt-20 scroll-mt-[calc(var(--header-h)+1.5rem)] first:mt-0">
                <span aria-hidden className="mb-4 block text-sm font-semibold tabular-nums tracking-[0.16em] text-orange-deep">
                  {String(n).padStart(2, '0')}
                </span>
                <span className="display block text-[clamp(1.8rem,1.26rem+1.71vw,2.93rem)] leading-[0.92] text-ink">{b.text}</span>
              </h2>
            );
          }
          case 'h3':
            return (
              <h3 key={i} className="display-soft mb-3 mt-12 text-[clamp(1.22rem,1.03rem+0.54vw,1.53rem)] leading-tight text-ink">
                {b.text}
              </h3>
            );
          case 'p':
            // Short unpunctuated lines are sub-subheadings the source stores as paragraphs.
            if (b.text.length <= 70 && !/[.!?:;,"”)]$/.test(b.text) && body[i + 1]?.type === 'p')
              return (
                <h4 key={i} className="mb-[-0.5rem] mt-9 text-[1.125rem] font-semibold text-ink">
                  {b.text}
                </h4>
              );
            return (
              <p key={i} className="mt-5 first:mt-0">
                {b.text}
              </p>
            );
          case 'quote':
            return (
              <blockquote
                key={i}
                className="relative my-12 rounded-[var(--radius)] bg-paper py-8 pl-9 pr-7 shadow-[0_20px_40px_-34px_rgb(60_30_5/0.45)] before:absolute before:inset-y-7 before:left-0 before:w-1.5 before:rounded-r-full before:bg-orange sm:-mx-6 sm:pl-12 sm:pr-10"
              >
                <p className="display-soft text-[clamp(1.17rem,0.99rem+0.63vw,1.53rem)] leading-[1.3] text-ink">{b.text}</p>
              </blockquote>
            );
          case 'ul':
            return (
              <ul key={i} className="mt-6 space-y-3">
                {b.items.map((it, j) => (
                  <li key={j} className="relative pl-7">
                    <span aria-hidden className="absolute left-0.5 top-[0.72em] size-2 rounded-full bg-orange" />
                    {labelled(it)}
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="mt-6 space-y-4">
                {b.items.map((it, j) => (
                  <li key={j} className="grid grid-cols-[2.25rem_1fr] gap-2">
                    <span aria-hidden className="pt-[0.2em] text-sm font-semibold tabular-nums text-orange-deep">
                      {String(j + 1).padStart(2, '0')}
                    </span>
                    <span>{labelled(it)}</span>
                  </li>
                ))}
              </ol>
            );
          case 'table':
            return (
              <div key={i} className="my-10 overflow-x-auto rounded-[var(--radius)] border border-[var(--line)] bg-paper">
                <table className="w-full min-w-[32rem] border-collapse text-left text-[0.975rem] leading-snug">
                  <thead>
                    <tr className="bg-ink text-paper">
                      {b.head.map((h, j) => (
                        <th key={j} scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-[var(--line)] align-top">
                        {r.map((c, k) => (
                          <td key={k} className={`px-5 py-4 ${k === 0 ? 'font-semibold text-ink' : ''}`}>
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}

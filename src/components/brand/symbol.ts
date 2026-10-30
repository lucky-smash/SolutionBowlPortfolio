import { LOGO_GREY, LOGO_ORANGE, LOGO_VIEWBOX } from './logo-paths';

/** Keeps only the subpaths of the mark above the wordmark (the SB symbol), for drawing it on its own. */
const symbolOnly = (d: string) =>
  d
    .split(/(?=M)/)
    .filter((p) => {
      const m = p.match(/M\s*([\d.]+)[ ,]([\d.]+)/);
      return m && +m[2] < LOGO_VIEWBOX.symbolHeight;
    })
    .join('');

export const SYMBOL_ORANGE = symbolOnly(LOGO_ORANGE);
export const SYMBOL_GREY = symbolOnly(LOGO_GREY);
export const SYMBOL_VIEWBOX = `0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.symbolHeight}`;

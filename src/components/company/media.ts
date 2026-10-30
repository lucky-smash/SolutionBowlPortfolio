// Local copies of the live site's photos. Team portraits live in /public/img/team/<kebab-name>.webp and
// life-gallery photos in /public/img/life/<same file name as the live URL>.

/** "Jogender S" → /img/team/jogender-s.webp */
export function teamPhoto(name: string) {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/img/team/${slug}.webp`;
}

/** https://…/life-gallery/demo-day.webp → /img/life/demo-day.webp */
export function lifePhoto(src: string) {
  return `/img/life/${src.split('/').pop()}`;
}

/** "01" style index. */
export const pad = (n: number) => String(n).padStart(2, '0');

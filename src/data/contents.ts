// The Index: every piece on the site in one list, newest first. Shared by the
// page and the prerender so the crawler sees the same thirty-odd links.
import { thoughtItems, issueNo, issueMonth } from './thoughts';
import { archiveItems } from './experiments';
import { works } from './presence';

export type Entry = { href: string; title: string; verdict: string; kind: string; month: string; published: string; no?: string };

const kindOfThought = (c: string) => (c === 'Reflections' ? 'Reflection' : c === 'Concept Notes' ? 'Note' : 'Essay');
const kindOfArchive = (c: string) => (c === 'Case Studies' ? 'Case' : c === 'Prototypes' ? 'Prototype' : 'Collaboration');

export const contents: Entry[] = [
  ...thoughtItems.map(t => ({
    href: `/thoughts/${t.slug}`, title: t.title, verdict: t.verdict, kind: kindOfThought(t.category),
    month: issueMonth(t.published), published: t.published, no: issueNo(t.slug)
  })),
  ...archiveItems.map(a => ({
    href: `/experiments/${a.slug}`, title: a.title, verdict: a.verdict, kind: kindOfArchive(a.category),
    month: issueMonth(a.published), published: a.published
  })),
  ...works.map(w => ({
    href: `/presence/${w.slug}`, title: w.title, verdict: w.verdict, kind: w.kind === 'film' ? 'Film' : 'Gallery',
    month: issueMonth(w.published), published: w.published
  }))
].sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));

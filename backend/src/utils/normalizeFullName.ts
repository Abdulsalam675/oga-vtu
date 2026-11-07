export function normalizeFullName(name: string | null | undefined): string {
  if (!name) return "";
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/(?:^|\s|-|')\S/g, (match) => match.toUpperCase());
}
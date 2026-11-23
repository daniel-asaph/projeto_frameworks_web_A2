const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.slice(0, 10).split('-');
  return `${day}/${month}/${year}`;
}

export function todayIso(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export function addDaysIso(isoDate: string, days: number): string {
  if (!isoDate) return '';
  const base = Date.parse(isoDate.slice(0, 10));
  if (Number.isNaN(base)) return '';
  return new Date(base + days * MS_PER_DAY).toISOString().slice(0, 10);
}

export function daysBetween(startIso: string, endIso: string): number {
  if (!startIso || !endIso) return 0;
  const start = Date.parse(startIso);
  const end = Date.parse(endIso);
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 0;
  return Math.max(1, Math.ceil((end - start) / MS_PER_DAY));
}


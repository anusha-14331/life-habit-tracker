// Return local date key 'YYYY-MM-DD' in the user's local timezone
// Uses en-CA locale to avoid UTC shifts from toISOString()
export function toDateKey(date) {
  return date.toLocaleDateString('en-CA');
}

// Start of week (Monday) for a given date
export function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun - 6 Sat
  const diff = (day === 0 ? -6 : 1) - day; // shift to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

// 7 days of the current week (Mon-Sun)
export function getCurrentWeek() {
  const today = new Date();
  const start = startOfWeek(today);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

// All days in current month
export function getCurrentMonthDays() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const start = new Date(year, month, 1);
  const days = [];
  while (start.getMonth() === month) {
    days.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }
  return days;
}

export function formatShortWeekday(date) {
  return date.toLocaleDateString(undefined, { weekday: 'short' });
}

export function isSameDay(d1, d2) {
  return toDateKey(d1) === toDateKey(d2);
}


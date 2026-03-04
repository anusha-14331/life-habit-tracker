import { getCurrentMonthDays, toDateKey } from './dateUtils.js';

export function computeLevel(xp) {
  // Level = floor(xp / 100) + 1 (Level 1 starts at 0 XP)
  return Math.floor(xp / 100) + 1;
}

export function computeLevelProgress(xp) {
  const xpInLevel = xp % 100;
  const pct = (xpInLevel / 100) * 100;
  return { xpInLevel, pct };
}

// Today completion percentage across all habits
// Uses completion state embedded inside each habit
export function todayCompletionPercent(habits) {
  const totalHabits = habits.length;
  if (totalHabits === 0) return 0;

  const todayKey = toDateKey(new Date());
  const completedCount = habits.filter(
    (h) => !!(h.completions && h.completions[todayKey])
  ).length;
  return Math.round((completedCount / totalHabits) * 100);
}

// Monthly overview: days with at least one completion
export function monthlyOverview(habits, completions) {
  const days = getCurrentMonthDays();
  const totalDays = days.length;
  let daysWithAny = 0;

  const dayStatus = days.map((d) => {
    const key = toDateKey(d);
    let hasAny = false;
    for (const habit of habits) {
      if (completions[habit.id]?.[key]) {
        hasAny = true;
        break;
      }
    }
    if (hasAny) daysWithAny += 1;
    return { date: d, key, hasAny };
  });

  const percent = totalDays === 0 ? 0 : Math.round((daysWithAny / totalDays) * 100);
  return { dayStatus, percent };
}

// Global streak: consecutive days up to today with at least one completion
export function computeStreak(habits, completions) {
  if (!habits.length) return 0;

  let streak = 0;
  const today = new Date();

  // Check up to 365 days back max
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = toDateKey(d);

    let hasAny = false;
    for (const habit of habits) {
      if (completions[habit.id]?.[key]) {
        hasAny = true;
        break;
      }
    }

    if (hasAny) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}


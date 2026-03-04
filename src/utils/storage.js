import { toDateKey } from './dateUtils.js';

const STORAGE_KEY = 'gamified-habit-tracker-v3-daily-calendar';

// Default persisted state shape for daily tracker with calendar
const defaultState = {
  habits: [],
  // Per-day completion: { [dateKey]: { [habitId]: boolean } }
  completionsByDate: {},
  // Dates where ALL habits were completed (array of ISO date strings)
  completedDates: [],
  // Total XP across all days
  xp: 0,
};

export function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    const habits = parsed.habits || [];

    // Backwards compatibility: if old flat "completions" existed, wrap it into today's date
    const todayKey = toDateKey(new Date());
    let completionsByDate = parsed.completionsByDate || {};
    if (!parsed.completionsByDate && parsed.completions && !Array.isArray(parsed.completions)) {
      completionsByDate = {
        [todayKey]: parsed.completions,
      };
    }

    const completedDates = Array.isArray(parsed.completedDates)
      ? parsed.completedDates
      : [];
    const xp = typeof parsed.xp === 'number' ? parsed.xp : 0;

    return {
      habits,
      completionsByDate,
      completedDates,
      xp,
    };
  } catch {
    return defaultState;
  }
}

export function saveState(state) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        habits: state.habits,
        completionsByDate: state.completionsByDate,
        completedDates: state.completedDates,
        xp: state.xp,
      })
    );
  } catch {
    // Ignore write errors (e.g. private mode)
  }
}


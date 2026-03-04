import React, { useMemo } from 'react';
import { getCurrentMonthDays, toDateKey } from '../utils/dateUtils.js';

// Small monthly calendar: dates in completedDates are shown with a green tick.
// Clicking a date toggles its presence in completedDates via toggleCompletedDate.
function MonthlyOverview({ completedDates, toggleCompletedDate }) {
  const days = useMemo(() => getCurrentMonthDays(), []);
  const completedSet = useMemo(() => new Set(completedDates || []), [completedDates]);

  const monthName =
    days[0]?.toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric',
    }) ?? '';

  return (
    <div className="card p-4 sm:p-5">
      <p className="section-title">Monthly Sparkle Calendar</p>
      <div className="mt-1 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-pink-100">
          {monthName || 'This Month'}
        </h2>
        <span className="rounded-full bg-pink-500/15 px-3 py-1 text-xs font-semibold text-pink-100 border border-pink-400/60">
          Completed days: {completedDates?.length ?? 0}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1">
        {renderOffsetBlanks(days)}
        {days.map((date) => {
          const key = toDateKey(date);
          const isCompleted = completedSet.has(key);
          return (
            <button
              type="button"
              key={key}
              onClick={() => toggleCompletedDate(key)}
              className={`flex h-7 w-7 items-center justify-center rounded-xl border text-xs transition
                ${
                  isCompleted
                    ? 'border-emerald-400 bg-emerald-500/25 text-emerald-50 shadow-[0_0_10px_rgba(16,185,129,0.7)]'
                    : 'border-slate-800 bg-slate-900/70 text-slate-400 hover:border-slate-600'
                }
              `}
            >
              {isCompleted ? '✔' : date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function renderOffsetBlanks(days) {
  if (!days.length) return null;
  const first = days[0].getDay(); // 0 Sun - 6 Sat
  const blankCount = first === 0 ? 6 : first - 1; // Monday-first grid

  return Array.from({ length: blankCount }, (_, i) => (
    <div key={`blank-${i}`} className="h-7 w-7" />
  ));
}

export default MonthlyOverview;


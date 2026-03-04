import React from 'react';

// Single-day habit row: one cute checkbox for "today"
function HabitRow({ habit, checked, toggleCompletion, deleteHabit }) {
  const handleToggle = () => {
    toggleCompletion(habit.id);
  };

  return (
    <li className="flex items-center justify-between rounded-2xl border border-pink-400/30 bg-slate-900/60 px-4 py-3 hover:border-pink-300 transition">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-500/20 text-[13px] font-semibold text-primary-100 shadow-[0_0_12px_rgba(244,114,182,0.7)]">
          {habit.name.slice(0, 1).toUpperCase()}♡
        </span>
        <span className="text-sm text-slate-100">{habit.name}</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleToggle}
          className={`flex h-8 w-8 items-center justify-center rounded-xl border text-sm font-semibold transition
            ${
              checked
                ? 'border-pink-400 bg-pink-400 text-slate-950 shadow-[0_0_14px_rgba(244,114,182,0.9)]'
                : 'border-pink-500/40 bg-slate-900/80 text-pink-200 hover:border-pink-300 hover:text-pink-100'
            }
          `}
        >
          {checked ? '♡' : ''}
        </button>

        <button
          type="button"
          onClick={() => deleteHabit(habit.id)}
          className="inline-flex items-center justify-center rounded-xl border border-red-400/50 bg-red-500/10 px-3 py-1 text-[11px] font-semibold text-red-100 hover:bg-red-500/20"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default HabitRow;


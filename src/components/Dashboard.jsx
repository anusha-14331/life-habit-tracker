import React, { useMemo, useState } from 'react';
import StatsHeader from './StatsHeader.jsx';
import HabitRow from './HabitRow.jsx';
import MonthlyOverview from './MonthlyOverview.jsx';
import { computeLevel, computeLevelProgress, todayCompletionPercent } from '../utils/stats.js';
import { toDateKey } from '../utils/dateUtils.js';

function Dashboard({
  habits,
  completedDates,
  xp,
  addHabit,
  deleteHabit,
  toggleCompletion,
  toggleCompletedDate,
}) {
  const [newHabitName, setNewHabitName] = useState('');

  const todayKey = useMemo(() => toDateKey(new Date()), []);

  const level = useMemo(() => computeLevel(xp), [xp]);
  const levelProgress = useMemo(() => computeLevelProgress(xp), [xp]);
  const todayPercent = useMemo(() => todayCompletionPercent(habits), [habits]);

  const todayLabel = useMemo(() => {
    const date = new Date();
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  const handleAddHabit = (e) => {
    e.preventDefault();
    addHabit(newHabitName);
    setNewHabitName('');
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <StatsHeader
          xp={xp}
          level={level}
          levelProgress={levelProgress}
          todayPercent={todayPercent}
          todayLabel={todayLabel}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card lg:col-span-2 p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="section-title">Today&apos;s Habits</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-50">
                  Cute Daily Checklist
                </h2>
              </div>
              <form
                onSubmit={handleAddHabit}
                className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"
              >
                <input
                  type="text"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="Add a new habit (e.g., Drink water)"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/60"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50"
                  disabled={!newHabitName.trim()}
                >
                  + Add
                </button>
              </form>
            </div>

            <div className="mt-6">
              {habits.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">
                  No habits yet. Start by adding your first habit above.
                </p>
              ) : (
                <ul className="space-y-3">
                  {habits.map((habit) => (
                    <HabitRow
                      key={habit.id}
                      habit={habit}
                      checked={!!(habit.completions && habit.completions[todayKey])}
                      toggleCompletion={toggleCompletion}
                      deleteHabit={deleteHabit}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <MonthlyOverview
              completedDates={completedDates}
              toggleCompletedDate={toggleCompletedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


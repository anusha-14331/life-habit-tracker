import React from 'react';
import LevelProgressBar from './LevelProgressBar.jsx';

function StatsHeader({ xp, level, levelProgress, todayPercent, todayLabel }) {
  return (
    <header className="card p-4 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="section-title">Cute Habit World</p>
        <h1 className="mt-1 text-3xl font-extrabold text-pink-100 drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]">
          Level up your habits 💕
        </h1>
        <p className="mt-1 text-sm text-pink-100/80">
          Build streaks, earn XP and grow a dreamy little life full of hearts and sparkles ✨.
        </p>
        <p className="mt-2 text-xs text-pink-100/70">
          Today is <span className="font-semibold">{todayLabel}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center">
        <div className="rounded-2xl bg-pink-500/10 px-4 py-3 border border-pink-400/40">
          <p className="text-[11px] uppercase tracking-wide text-slate-100/80">
            Today&apos;s Completion
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-primary-300">
              {todayPercent}%
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/80 px-4 py-3 border border-pink-400/30 col-span-2 sm:col-span-1">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-pink-100/80">
                XP &amp; Level ♡
              </p>
              <p className="mt-1 text-sm text-slate-100">
                <span className="font-semibold text-primary-300">{xp}</span> XP ·
                Level <span className="font-semibold">{level}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-500">Next Level</p>
              <p className="text-xs text-slate-300">
                {levelProgress.xpInLevel}/100 XP
              </p>
            </div>
          </div>
          <LevelProgressBar percent={levelProgress.pct} />
        </div>

        {/* Third card slot left empty for now (e.g. future streaks or notes) */}
        <div className="rounded-2xl bg-slate-900/40 px-4 py-3 border border-slate-700/60 col-span-2 sm:col-span-1" />
      </div>
    </header>
  );
}

export default StatsHeader;


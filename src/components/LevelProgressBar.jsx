import React from 'react';

function LevelProgressBar({ percent }) {
  const safePercent = Math.min(100, Math.max(0, percent));

  return (
    <div className="mt-2 h-2 w-full rounded-full bg-slate-800/90">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-primary-400 via-primary-300 to-pink-300 shadow-[0_0_18px_rgba(236,72,153,0.8)] transition-all duration-500"
        style={{ width: `${safePercent}%` }}
      />
    </div>
  );
}

export default LevelProgressBar;


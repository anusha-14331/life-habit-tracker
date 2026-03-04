import React from 'react';

function MotivationalMessage({ percent }) {
  let message = 'You can do better 💗';
  let tone = 'text-pink-200';
  let bg = 'bg-pink-500/10 border-pink-500/30';

  if (percent >= 80) {
    message = "You're unstoppable ✨💕";
    tone = 'text-pink-200';
    bg = 'bg-pink-500/15 border-pink-400/40';
  } else if (percent >= 40) {
    message = 'Good progress 🌸';
    tone = 'text-primary-200';
    bg = 'bg-primary-500/10 border-primary-500/30';
  }

  return (
    <div className={`card p-4 sm:p-5 border ${bg}`}>
      <p className="section-title">Motivation</p>
      <p className={`mt-2 text-sm font-medium ${tone}`}>{message}</p>
      <p className="mt-1 text-xs text-slate-400">
        Weekly completion:{' '}
        <span className="font-semibold text-slate-200">{percent}%</span>. Every small
        win compounds over time.
      </p>
    </div>
  );
}

export default MotivationalMessage;


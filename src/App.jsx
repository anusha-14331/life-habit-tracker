import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import { toDateKey } from './utils/dateUtils.js';

function safeParse(json, fallback) {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  // Initialize from localStorage directly (habits array with embedded completion state)
  const [habits, setHabits] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem('habits');
    return safeParse(saved, []);
  });

  const [completedDates, setCompletedDates] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem('completedDates');
    return safeParse(saved, []);
  });

  const [xp, setXp] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = window.localStorage.getItem('xp');
    const parsed = safeParse(saved, 0);
    return typeof parsed === 'number' ? parsed : 0;
  });

  const toggleCompletedDate = (dateKey) => {
    setCompletedDates((prevDates) => {
      const exists = prevDates.includes(dateKey);
      if (exists) {
        // Remove from completed dates
        return prevDates.filter((d) => d !== dateKey);
      }
      // Add to completed dates
      return [...prevDates, dateKey];
    });
  };

  // Persist habits to localStorage ONLY when habits change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  // Persist completed dates when they change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('completedDates', JSON.stringify(completedDates));
  }, [completedDates]);

  // Persist XP when it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('xp', JSON.stringify(xp));
  }, [xp]);

  // Add a new habit
  const addHabit = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;

    const newHabit = {
      id,
      name: trimmed,
      createdAt: new Date().toISOString(),
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  // Delete habit and its completions
  const deleteHabit = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this habit?');
    if (!confirmed) return;

    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  // Toggle completion for a habit for "today"
  const toggleCompletion = (habitId) => {
    const todayKey = toDateKey(new Date());

    setHabits((prevHabits) => {
      let deltaXp = 0;

      const updatedHabits = prevHabits.map((habit) => {
        if (habit.id !== habitId) return habit;

        const prevCompletions = habit.completions || {};
        const wasCompleted = !!prevCompletions[todayKey];
        const nextCompleted = !wasCompleted;

        deltaXp += nextCompleted ? 10 : -10;

        return {
          ...habit,
          completions: {
            ...prevCompletions,
            [todayKey]: nextCompleted,
          },
        };
      });

      // Update XP based on user action
      if (deltaXp !== 0) {
        setXp((prevXp) => Math.max(0, prevXp + deltaXp));
      }

      // Determine if today is a "completed day" (all habits done)
      const hasHabits = updatedHabits.length > 0;
      const allCompleted =
        hasHabits &&
        updatedHabits.every((h) => !!(h.completions && h.completions[todayKey]));

      setCompletedDates((prevDates) => {
        const exists = prevDates.includes(todayKey);
        if (allCompleted && !exists) {
          return [...prevDates, todayKey];
        }
        if (!allCompleted && exists) {
          return prevDates.filter((d) => d !== todayKey);
        }
        return prevDates;
      });

      return updatedHabits;
    });
  };

  return (
    <div className="min-h-screen">
      <Dashboard
        habits={habits}
        completedDates={completedDates}
        xp={xp}
        addHabit={addHabit}
        deleteHabit={deleteHabit}
        toggleCompletion={toggleCompletion}
        toggleCompletedDate={toggleCompletedDate}
      />
    </div>
  );
}

export default App;


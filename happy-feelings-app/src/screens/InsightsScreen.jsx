import React from "react";

export default function InsightsScreen({ data }) {
  const completedGoals = data.goals?.filter((g) => g.status === "completed")
    .length || 0;
  const startedGoals = data.goals?.length || 0;
  const happySavings = data.happyBank?.length || 0;
  const withdrawnGoals = data.goals?.filter((g) => g.status === "withdrawn")
    .length || 0;

  return (
    <div className="screen">
      <h2>Mood Insights</h2>
      <div className="summary-row">
        <div className="summary-card">
          <div className="summary-number">{completedGoals}</div>
          <div className="summary-label">Completed Goals</div>
        </div>
        <div className="summary-card">
          <div className="summary-number">{startedGoals}</div>
          <div className="summary-label">Started Goals</div>
        </div>
      </div>
      <div className="summary-row">
        <div className="summary-card">
          <div className="summary-number">{happySavings}</div>
          <div className="summary-label">Happy Savings</div>
        </div>
        <div className="summary-card">
          <div className="summary-number">{withdrawnGoals}</div>
          <div className="summary-label">Withdrawn Goals</div>
        </div>
      </div>

      <div className="card">
        <h3>Mood journal history</h3>
        {data.moodEntries?.length ? (
          <p className="muted small">
            You have {data.moodEntries.length} mood journal entries so far. Keep
            tracking to discover patterns in your wellbeing.
          </p>
        ) : (
          <p className="muted small">
            No mood entries yet. Start journaling to see your history here.
          </p>
        )}
      </div>

      <div className="card warning">
        <h3>Feeling low? Get support</h3>
        <p className="muted small">
          It sounds like you&apos;re going through a tough time or your
          well-being levels are low. Please consider reaching out to the NHS or
          another organisation that can offer support.
        </p>
        <button className="primary full">Call Emergency Now</button>
        <label>
          Type your postcode to know about nearest medical centre
          <input placeholder="E10 6RA" />
        </label>
      </div>
    </div>
  );
}
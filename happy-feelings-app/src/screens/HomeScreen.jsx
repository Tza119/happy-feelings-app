import React from "react";

export default function HomeScreen({ data, user }) {
  const name = user?.name || "User";
  const happySavings = data.happyBank?.length || 0;
  const completedGoals = data.goals?.filter((g) => g.status === "completed")
    .length || 0;
  const streak = Math.min(
    completedGoals + happySavings,
    10
  ); // simple fake streak

  return (
    <div className="screen">
      <h2>Home</h2>
      <div className="card">
        <div className="home-header">
          <div>
            <div className="muted small">Welcome back</div>
            <h3>{name}</h3>
          </div>
          <div className="chip chip-outline">Rewards</div>
        </div>
        <p className="muted">
          Hello {name}, start filling your bank with happy savings.
        </p>
        <button className="primary full">Add your first happy saving</button>
      </div>

      <div className="card">
        <h3>Your reward points</h3>
        <div className="rewards-row">
          <div>
            <div className="reward-points">{data.rewardsPoints}</div>
            <div className="muted small">points</div>
          </div>
          <div>
            <div className="reward-points small">{streak}</div>
            <div className="muted small">days streak</div>
          </div>
        </div>
        <p className="muted small">
          Smash your goals, score points! Every achievement unlocks awesome
          rewards you deserve.
        </p>
      </div>
    </div>
  );
}
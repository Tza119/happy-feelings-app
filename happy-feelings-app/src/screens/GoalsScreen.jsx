import React, { useState } from "react";
import { CATEGORIES } from "../utils";

function GoalForm({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Body");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("1 x Weekly");
  const [duration, setDuration] = useState("1 Hour");
  const [startTime, setStartTime] = useState("08:00");
  const [targetDate, setTargetDate] = useState("");
  const [reward, setReward] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: Date.now(),
      title: title || "New Goal",
      category,
      description,
      frequency,
      duration,
      startTime,
      targetDate,
      reward,
      status: "active",
      progress: 0
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal card">
        <h3>Add goal</h3>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Goal title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description of your goal"
            />
          </label>
          <label>
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label>
            Frequency
            <input
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            />
          </label>
          <label>
            Daily engagement duration
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </label>
          <label>
            Start time
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
          <label>
            Goal target achievement date
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </label>
          <label>
            Reward
            <input
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              placeholder="Write your reward"
            />
          </label>
          <div className="actions-row">
            <button type="button" className="secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="primary">
              Save goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function GoalCard({ goal, onComplete }) {
  const progress = goal.status === "completed" ? 100 : goal.progress || 0;
  return (
    <div className="goal-card">
      <div className="goal-header">
        <div>
          <div className="chip">{goal.category}</div>
          <h4>{goal.title}</h4>
          {goal.description && (
            <p className="muted small">{goal.description}</p>
          )}
        </div>
        {goal.status !== "completed" && (
          <button
            className="primary small"
            onClick={() => onComplete(goal.id)}
          >
            Mark done
          </button>
        )}
      </div>
      <div className="goal-meta">
        {goal.targetDate && (
          <span>Target: {goal.targetDate}</span>
        )}
        <span>{goal.frequency}</span>
        <span>{goal.duration}</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: progress + "%" }}
        />
      </div>
    </div>
  );
}

export default function GoalsScreen({ data, onUpdate, onCompleteGoal }) {
  const [view, setView] = useState("daily");
  const [showForm, setShowForm] = useState(false);
  const goals = data.goals || [];

  const targetScore = goals.length * 36 || 0;
  const actualScore = goals.filter((g) => g.status === "completed").length * 23;

  const handleAddGoal = (goal) => {
    onUpdate({ goals: [...goals, goal] });
    setShowForm(false);
  };

  return (
    <div className="screen">
      <h2>My Goals</h2>
      <div className="summary-row">
        <div className="summary-card">
          <div className="summary-number">{targetScore}</div>
          <div className="summary-label">Target Score</div>
        </div>
        <div className="summary-card">
          <div className="summary-number">{actualScore}</div>
          <div className="summary-label">Actual Score</div>
        </div>
      </div>

      <div className="toggle-row">
        {["daily", "monthly", "yearly"].map((v) => (
          <button
            key={v}
            className={
              "toggle-btn" + (view === v ? " toggle-btn-active" : "")
            }
            onClick={() => setView(v)}
          >
            {v === "daily" ? "Daily/Weekly" : v[0].toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {goals.length === 0 ? (
        <div className="empty-state">
          <p className="muted">Add some goals, to become happy!</p>
        </div>
      ) : (
        <div className="card">
          {goals.map((g) => (
            <GoalCard key={g.id} goal={g} onComplete={onCompleteGoal} />
          ))}
        </div>
      )}

      <button className="fab" onClick={() => setShowForm(true)}>
        +
      </button>

      {showForm && (
        <GoalForm
          onSave={handleAddGoal}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
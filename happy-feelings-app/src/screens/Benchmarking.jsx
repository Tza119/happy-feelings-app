import React, { useState } from "react";

export default function Benchmarking({ benchmark, onComplete }) {
  const [value, setValue] = useState(benchmark?.value || 5);
  const [note, setNote] = useState(benchmark?.note || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(value, note);
  };

  return (
    <div className="screen">
      <h2>Benchmarking</h2>
      <div className="card">
        <h3>Initial Overall Wellbeing</h3>
        <p className="muted">
          Before setting your goals, let&apos;s get a snapshot of your current wellbeing.
        </p>
        <form onSubmit={handleSubmit} className="form">
          <label>
            What is your level of wellbeing?
            <input
              type="range"
              min="1"
              max="10"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>Poor</span>
              <span>{value}</span>
              <span>Excellent</span>
            </div>
          </label>
          <label>
            More information
            <textarea
              placeholder="Share more details"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
          <button type="submit" className="primary full">Continue</button>
        </form>
      </div>
    </div>
  );
}
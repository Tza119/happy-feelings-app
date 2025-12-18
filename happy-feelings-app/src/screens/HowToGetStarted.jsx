import React from "react";

const GOAL_POINTS = [
  {
    title: "Mind Goal",
    text: "Career development, educational achievements, and other activities that help you grow mentally or professionally."
  },
  {
    title: "Body Goal",
    text: "Physical and mental wellbeing activities, such as exercise, rest, healthy routines, or relaxation."
  },
  {
    title: "Soul Goal",
    text: "Taking time for spiritual or reflective activities that nourish your inner self."
  },
  {
    title: "Community Goal",
    text: "Giving back through volunteering, community projects, or contributions to the NHS and wider community."
  }
];

export default function HowToGetStarted({ onDone }) {
  return (
    <div className="screen">
      <h2>How to get started</h2>
      <div className="card">
        <p>
          Make deposits in your <strong>Happy Bank</strong>. These moments or
          activities are crucial as they provide ongoing motivation to engage
          with your other goals. They represent activities that make you feel
          good.
        </p>

        <p>
          Start by creating the following four SMART goals:
        </p>

        <ol className="list">
          {GOAL_POINTS.map((p) => (
            <li key={p.title}>
              <strong>{p.title} – </strong>
              <span>{p.text}</span>
            </li>
          ))}
        </ol>

        <button className="primary full" onClick={onDone}>
          Add your first goal
        </button>
      </div>
    </div>
  );
}
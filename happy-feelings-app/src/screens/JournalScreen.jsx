import React, { useState } from "react";
import { FEELING_GROUPS } from "../utils";

const WHO_OPTIONS = ["Family", "Friends", "Colleagues", "Relatives", "Alone"];
const WHERE_OPTIONS = ["Home", "School", "Office", "Crowd", "Outdoors"];

function MoodEntryForm({ onSave, onCancel }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [valence, setValence] = useState("pleasant");
  const [selectedFeelings, setSelectedFeelings] = useState([]);
  const [who, setWho] = useState([]);
  const [where, setWhere] = useState([]);
  const [situation, setSituation] = useState("");
  const [notes, setNotes] = useState(""); // ✅ new notes state

  const toggleFromList = (value, list, setter) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const toggleFeeling = (f) => {
    setSelectedFeelings((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: Date.now(),
      date,
      valence,
      feelings: selectedFeelings,
      who,
      where,
      situation,
      notes, // ✅ save notes with entry
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal card">
        <h3>Mood Journal</h3>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            How are you feeling overall?
            <div className="toggle-row">
              <button
                type="button"
                className={
                  "toggle-btn" + (valence === "pleasant" ? " toggle-btn-active" : "")
                }
                onClick={() => setValence("pleasant")}
              >
                Pleasant
              </button>
              <button
                type="button"
                className={
                  "toggle-btn" + (valence === "unpleasant" ? " toggle-btn-active" : "")
                }
                onClick={() => setValence("unpleasant")}
              >
                Unpleasant
              </button>
            </div>
          </label>

          <label>
            Select feelings
            <div className="pill-list tall">
              {FEELING_GROUPS[valence].map((word) => (
                <button
                  key={word}
                  type="button"
                  className={
                    "pill" +
                    (selectedFeelings.includes(word) ? " pill-selected" : "")
                  }
                  onClick={() => toggleFeeling(word)}
                >
                  {word}
                </button>
              ))}
            </div>
          </label>

          <label>
            Who were you with?
            <div className="pill-list">
              {WHO_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={
                    "pill" + (who.includes(opt) ? " pill-selected" : "")
                  }
                  onClick={() => toggleFromList(opt, who, setWho)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </label>

          <label>
            Where were you?
            <div className="pill-list">
              {WHERE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={
                    "pill" + (where.includes(opt) ? " pill-selected" : "")
                  }
                  onClick={() => toggleFromList(opt, where, setWhere)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </label>

          <label>
            Explain your situation
            <textarea
              placeholder="Elaborate your current circumstances"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
            />
          </label>

          {/* ✅ New notes area */}
          <label>
            Personal notes (optional)
            <textarea
              placeholder="Add any private thoughts or reflections"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>

          <div className="actions-row">
            <button type="button" className="secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function JournalScreen({ data, onUpdate }) {
  const [showForm, setShowForm] = useState(false);
  const entries = data.moodEntries || [];

  const addEntry = (entry) => {
    onUpdate({ moodEntries: [...entries, entry] });
    setShowForm(false);
  };

  return (
    <div className="screen">
      <h2>Mood Journal</h2>
      <div className="card">
        <button className="primary full" onClick={() => setShowForm(true)}>
          Add your mood journal
        </button>
      </div>
      {entries.length > 0 && (
        <div className="card">
          <h3>Recent entries</h3>
          <ul className="list list-separated">
            {entries
              .slice()
              .reverse()
              .map((e) => (
                <li key={e.id}>
                  <div className="entry-header">
                    <div>
                      <div className="muted small">{e.date}</div>
                      <div className="badge">
                        {e.valence === "pleasant" ? "Happy" : "Low"}
                      </div>
                    </div>
                    <div className="muted small">
                      {e.feelings.slice(0, 3).join(", ")}
                      {e.feelings.length > 3 ? "..." : ""}
                    </div>
                  </div>
                  {e.situation && (
                    <p className="muted small">{e.situation}</p>
                  )}
                  {/* ✅ Show notes if present */}
                  {e.notes && (
                    <p className="muted small">
                      <strong>Notes: </strong>
                      {e.notes}
                    </p>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
      {showForm && (
        <MoodEntryForm onSave={addEntry} onCancel={() => setShowForm(false)} />
      )}
    </div>
  );
}

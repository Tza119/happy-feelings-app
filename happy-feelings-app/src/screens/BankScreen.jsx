import React, { useState } from "react";
import { loadState, saveState } from "../utils";

const defaultBankOptions = [
  "Spending time with family",
  "Listening to music",
  "Trying new things",
  "Exercise",
  "Reading a book",
  "Meditation or mindfulness exercises"
];

export default function BankScreen({ data, onUpdate }) {
  const [selected, setSelected] = useState([]);
  const [customText, setCustomText] = useState("");
  const [uploading, setUploading] = useState(false);
  const bank = data.happyBank || [];

  const toggleItem = (label) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  const addToBank = () => {
    const items = [...selected];
    if (customText.trim()) items.push(customText.trim());
    if (!items.length) return;
    const today = new Date().toISOString().slice(0, 10);
    const newEntries = items.map((title, idx) => ({
      id: Date.now() + idx,
      title,
      date: today
    }));
    onUpdate({ happyBank: [...bank, ...newEntries] });
    setSelected([]);
    setCustomText("");
  };

  const happySavingsCount = bank.length;

  return (
    <div className="screen">
      <h2>Happy Bank</h2>
      <div className="summary-row">
        <div className="summary-card">
          <div className="summary-number">{happySavingsCount}</div>
          <div className="summary-label">Happy Savings</div>
        </div>
        <div className="summary-card">
          <div className="summary-number">
            {data.goals.filter((g) => g.status === "completed").length}
          </div>
          <div className="summary-label">Goals Completed</div>
        </div>
      </div>

      <div className="card">
        <h3>What makes you feel good?</h3>
<p className="muted">
  Select moments or activities from the Happy Bank that make you feel good.
  These are not goals, but positive experiences that support your wellbeing.
</p>
        <div className="pill-list">
          {defaultBankOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              className={
                "pill" + (selected.includes(opt) ? " pill-selected" : "")
              }
              onClick={() => toggleItem(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        <input
          placeholder="Write your own..."
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
        />
        <div className="actions-row">
          <button
            className="secondary"
            type="button"
            onClick={() => setUploading((u) => !u)}
          >
            {uploading ? "Hide upload" : "Upload photos"}
          </button>
          <button className="primary" type="button" onClick={addToBank}>
            Add to bank
          </button>
        </div>
        {uploading && (
          <div className="upload-box">
            <p className="muted small">
              (Optional) Attach photos to remember your happy savings.
            </p>
            <input type="file" multiple />
          </div>
        )}
      </div>

      {bank.length > 0 && (
        <div className="card">
          <h3>Happy Savings</h3>
          <ul className="list list-separated">
            {bank
              .slice()
              .reverse()
              .map((item) => (
                <li key={item.id} className="bank-item">
                  <div className="bank-item-main">
                    <div className="thumb" />
                    <div>
                      <div className="bank-title">{item.title}</div>
                      <div className="muted small">
                        {item.date}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
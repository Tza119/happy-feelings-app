export function loadState(key, defaultValue) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

export function saveState(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export const CATEGORIES = ["Mind", "Body", "Soul", "Community"];

export const FEELING_GROUPS = {
  pleasant: [
    "Relaxed",
    "Calm",
    "Happy",
    "Optimistic",
    "Excited",
    "Grateful",
    "Loved",
    "Confident",
    "Curious",
    "Playful"
  ],
  unpleasant: [
    "Sad",
    "Tired",
    "Worried",
    "Stressed",
    "Angry",
    "Frustrated",
    "Lonely",
    "Anxious",
    "Confused",
    "Overwhelmed"
  ]
};
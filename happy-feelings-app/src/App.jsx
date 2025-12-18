import React, { useState, useEffect } from "react";
import { loadState, saveState } from "./utils";
import AuthScreens from "./screens/AuthScreens";
import Benchmarking from "./screens/Benchmarking";
import HowToGetStarted from "./screens/HowToGetStarted";
import BankScreen from "./screens/BankScreen";
import GoalsScreen from "./screens/GoalsScreen";
import HomeScreen from "./screens/HomeScreen";
import JournalScreen from "./screens/JournalScreen";
import InsightsScreen from "./screens/InsightsScreen";
import SettingsScreen from "./screens/SettingsScreen";

const NAV_TABS = ["Bank", "My Goals", "Home", "Journal", "Insights"];

const initialUser = loadState("hf_user", null);
const initialData = loadState("hf_data", {
  wellbeingBenchmark: null,
  goals: [],
  happyBank: [],
  moodEntries: [],
  rewardsPoints: 0
});

export default function App() {
  const [user, setUser] = useState(initialUser);
  const [data, setData] = useState(initialData);
  const [screen, setScreen] = useState(user ? "benchmarking" : "auth");
  const [activeTab, setActiveTab] = useState("Home");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    saveState("hf_user", user);
  }, [user]);

  useEffect(() => {
    saveState("hf_data", data);
  }, [data]);

  const updateData = (patch) => {
    setData((prev) => ({ ...prev, ...patch }));
  };

  const logout = () => {
    setUser(null);
    setScreen("auth");
  };

  const completeGoal = (goalId, points = 10) => {
    setData((prev) => {
      const goals = prev.goals.map((g) =>
        g.id === goalId ? { ...g, status: "completed" } : g
      );
      return {
        ...prev,
        goals,
        rewardsPoints: prev.rewardsPoints + points
      };
    });
  };

  if (!user || screen === "auth") {
    return (
      <div className="app-root">
        <AuthScreens
          onAuthenticated={(userInfo) => {
            setUser(userInfo);
            setScreen("benchmarking");
          }}
        />
      </div>
    );
  }

  if (screen === "benchmarking") {
    return (
      <div className="app-root">
        <Benchmarking
          benchmark={data.wellbeingBenchmark}
          onComplete={(value, note) => {
            updateData({ wellbeingBenchmark: { value, note, date: new Date().toISOString() } });
            setScreen("howTo");
          }}
        />
      </div>
    );
  }

  if (screen === "howTo") {
    return (
      <div className="app-root">
        <HowToGetStarted onDone={() => setScreen("main")} />
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Bank":
        return (
          <BankScreen
            data={data}
            onUpdate={updateData}
          />
        );
      case "My Goals":
        return (
          <GoalsScreen
            data={data}
            onUpdate={updateData}
            onCompleteGoal={completeGoal}
          />
        );
      case "Home":
        return (
          <HomeScreen
            data={data}
            user={user}
          />
        );
      case "Journal":
        return (
          <JournalScreen
            data={data}
            onUpdate={updateData}
          />
        );
      case "Insights":
        return <InsightsScreen data={data} />;
      default:
        return null;
    }
  };

  if (showSettings) {
    return (
      <div className="app-root">
        <SettingsScreen user={user} onLogout={logout} onClose={() => setShowSettings(false)} />
      </div>
    );
  }

  return (
    <div className="app-root">
      <header className="top-bar">
        <h1 className="app-title">Happy Feelings</h1>
        <button className="icon-button" onClick={() => setShowSettings(true)}>
          ⚙️
        </button>
      </header>
      <main className="main-content">{renderActiveTab()}</main>
      <nav className="bottom-nav">
        {NAV_TABS.map((tab) => (
          <button
            key={tab}
            className={"nav-btn" + (tab === activeTab ? " active" : "")}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}
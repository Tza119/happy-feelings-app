import React, { useState } from "react";

function StartScreen({ onNext, onLogin }) {
  return (
    <div className="screen auth-screen">
      <div className="hero-img hero-family" />
      <div className="card">
        <p className="muted small">Already have an account?{" "}
          <button className="link" onClick={onLogin}>Log In</button>
        </p>
        <h2>Start Today!</h2>
        <p className="muted">Track your mood & cultivate happiness</p>
        <button className="primary" onClick={onNext}>Register to start</button>
      </div>
    </div>
  );
}

function LoginScreen({ onBack, onAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    onAuthenticated({ name: email.split("@")[0] || "User", email });
  };

  return (
    <div className="screen auth-screen">
      <div className="card">
        <button className="link small" onClick={onBack}>← Back</button>
        <h2>Welcome! Let's sign in</h2>
        <p className="muted">Sign in to track your mood and cultivate joy</p>
        <form onSubmit={handleLogin} className="form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="primary full">Login</button>
        </form>
        <button className="secondary full">Login with Google</button>
        <button className="link small">Forgot your password?</button>
      </div>
    </div>
  );
}

function RegisterScreen({ onBack, onRegistered }) {
  const [form, setForm] = useState({
    email: "",
    profileName: "",
    fullName: "",
    phone: "",
    gender: "",
    ageGroup: "",
    ethnicity: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistered({
      name: form.profileName || form.fullName || "User",
      email: form.email,
      profile: form
    });
  };

  return (
    <div className="screen auth-screen">
      <div className="card">
        <button className="link small" onClick={onBack}>← Back</button>
        <h2>Become a member</h2>
        <p className="muted">
          Sign up to become happy and track your moods
        </p>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Profile Name (only visible to you)
            <input
              name="profileName"
              value={form.profileName}
              onChange={handleChange}
            />
          </label>
          <label>
            Full Name
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone number
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </label>
          <label>
            Gender
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Age Group
            <select
              name="ageGroup"
              value={form.ageGroup}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>18 - 24 Years</option>
              <option>25 - 34 Years</option>
              <option>35 - 44 Years</option>
              <option>45+ Years</option>
            </select>
          </label>
          <label>
            Ethnicity
            <input
              name="ethnicity"
              value={form.ethnicity}
              onChange={handleChange}
            />
          </label>
          <label>
            Create a password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="primary full">Sign up</button>
        </form>
        <button className="secondary full">Sign up with Google</button>
        <p className="muted small">
          Already have an account?{" "}
          <button className="link" onClick={onBack}>Log In</button>
        </p>
      </div>
    </div>
  );
}

function PhoneVerification({ onVerified }) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerified();
  };

  return (
    <div className="screen auth-screen">
      <div className="hero-img hero-family" />
      <div className="card">
        <h2>Verify your mobile number</h2>
        <p className="muted">
          Please enter the 5-digit code sent to your phone.
        </p>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            maxLength={5}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-input"
          />
          <button type="submit" className="primary full">Let&apos;s Go</button>
        </form>
        <button className="link">Resend code</button>
        <button className="link small">Change phone number</button>
      </div>
    </div>
  );
}

function VerifiedScreen({ onStart }) {
  return (
    <div className="screen auth-screen">
      <div className="hero-img hero-family" />
      <div className="card center">
        <div className="verified-icon">✔</div>
        <h2>Verified</h2>
        <p className="muted">
          You have successfully verified your code.
        </p>
        <button className="primary" onClick={onStart}>Start Now</button>
      </div>
    </div>
  );
}

export default function AuthScreens({ onAuthenticated }) {
  const [step, setStep] = useState("start");
  const [pendingUser, setPendingUser] = useState(null);

  if (step === "start") {
    return (
      <StartScreen
        onNext={() => setStep("register")}
        onLogin={() => setStep("login")}
      />
    );
  }

  if (step === "login") {
    return (
      <LoginScreen
        onBack={() => setStep("start")}
        onAuthenticated={(user) => onAuthenticated(user)}
      />
    );
  }

  if (step === "register") {
    return (
      <RegisterScreen
        onBack={() => setStep("login")}
        onRegistered={(user) => {
          setPendingUser(user);
          setStep("verify");
        }}
      />
    );
  }

  if (step === "verify") {
    return (
      <PhoneVerification
        onVerified={() => setStep("verified")}
      />
    );
  }

  if (step === "verified") {
    return (
      <VerifiedScreen
        onStart={() => {
          onAuthenticated(pendingUser || { name: "User" });
        }}
      />
    );
  }

  return null;
}
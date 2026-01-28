import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const leakedPasswords = ["123456", "password", "admin", "qwerty", "welcome"];
  const result = zxcvbn(password);

  const getStrengthLabel = (score) => {
    switch (score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const getStrengthColor = (score) => {
    return ["#dc3545", "#fd7e14", "#ffc107", "#9be15d", "#28a745"][score];
  };

  return (
    <div className="page">
      {/* LEFT INFO PANEL */}
      <div className="info-panel">
        <h1>🔐 Password Security Guide</h1>

        <p>
          Weak passwords are one of the most common causes of security breaches.
          This tool helps you analyze password strength and improve security.
        </p>

        <h3>🚀 Get Started</h3>
        <ul className="icon-list">
          <li>🔑 Enter your password</li>
          <li>📊 Check strength score</li>
          <li>🛡 Review security tips</li>
          <li>🚫 Avoid leaked passwords</li>
        </ul>

        <h3>🛡 Why Strong Passwords Matter</h3>
        <ul className="icon-list">
          <li>🔒 Protect personal data</li>
          <li>⚔ Prevent brute-force attacks</li>
          <li>🧠 Reduce account compromise risk</li>
        </ul>

        <h3>📊 How This Analyzer Works</h3>
        <div className="infographic">
          <div className="step">
            <span>🔑</span>
            <p>Password</p>
          </div>
          <span className="arrow">➡</span>
          <div className="step">
            <span>⚙</span>
            <p>Analysis</p>
          </div>
          <span className="arrow">➡</span>
          <div className="step">
            <span>📊</span>
            <p>Score</p>
          </div>
          <span className="arrow">➡</span>
          <div className="step">
            <span>🛡</span>
            <p>Tips</p>
          </div>
        </div>

        <p className="note">🔒 Passwords are analyzed locally and never stored.</p>
      </div>

      {/* RIGHT ANALYZER CARD */}
      <div className="container">
        <h2>🔐 Password Strength Analyzer</h2>
        <p className="subtitle">
          Check how secure your password is before using it
        </p>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"} Password
        </button>

        {password && (
          <>
            <div className="strength-bar">
              <div
                className="strength-fill"
                style={{
                  width: `${(result.score + 1) * 20}%`,
                  backgroundColor: getStrengthColor(result.score),
                }}
              ></div>
            </div>

            <p className="label">
              Strength: <b>{getStrengthLabel(result.score)}</b>
            </p>

            <p className="crack-time">
              Crack Time:{" "}
              {result.crack_times_display.offline_slow_hashing_1e4_per_second}
            </p>

            {result.feedback.warning && (
              <p className="warning">⚠ {result.feedback.warning}</p>
            )}

            {result.feedback.suggestions.length > 0 && (
              <ul className="suggestions">
                {result.feedback.suggestions.map((tip, index) => (
                  <li key={index}>✔ {tip}</li>
                ))}
              </ul>
            )}

            {leakedPasswords.includes(password) && (
              <p className="leak-alert">
                🚨 This password was found in a leaked password list!
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { auth } from "../firebase"; // Import Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth methods
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Use Firebase Authentication to sign in
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        usernameOrEmail,
        password
      );
      const user = userCredential.user;

      // Storing user ID in local storage
      localStorage.setItem("userId", user.uid);

      // Redirect to MyActivity page
      navigate("/MyActivity");
    } catch (err) {
      console.error("Error during login:", err);
      setError(err.message || "Login failed. Please try again.");
    }
  };

  const handleRegistrationRedirect = () => {
    navigate("/Registration");
  };

  return (
    <div>
      <br />
      <br />
      <div className={styles.login_container}>
        <h2 className={styles.login_header}>Login</h2>
        <form className={styles.login_form} onSubmit={handleSubmit}>
          <div>
            <label className={styles.login_label}>Username or Email:</label>
            <input
              type="text"
              name="usernameOrEmail"
              className={styles.login_input}
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.login_label}>Password:</label>
            <div style={{ display: "flex" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={styles.login_passwordInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.login_toggleButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.login_submitButton}>
            Login
          </button>
          {error && <p className={styles.login_error}>{error}</p>}
        </form>

        <div className={styles.registration_link}>
          <p>
            Don't have an account?{" "}
            <button
              onClick={handleRegistrationRedirect}
              className={styles.link}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

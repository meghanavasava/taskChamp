import React, { useState } from "react";
import { realDb } from "../firebase"; 
import { useNavigate } from "react-router-dom";
import { ref, get, child } from "firebase/database";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const dbRef = ref(realDb);

    get(child(dbRef, `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const users = snapshot.val();

          const user = Object.values(users).find(
            (user) =>
              user.username === usernameOrEmail ||
              user.email === usernameOrEmail
          );

          if (user) {
            if (user.password === password) {
              console.log("Login successful!");

              // Storing user ID in local storage
              localStorage.setItem("userId", user.id);

              // Redirect to MyActivity page
              navigate("/MyActivity");
            } else {
              setError("Incorrect password.");
            }
          } else {
            setError("User not found.");
          }
        } else {
          setError("No users found in the database.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setError("Login failed. Please try again.");
      });
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
            <button onClick={handleRegistrationRedirect} className={styles.link}>
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

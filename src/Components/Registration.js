import React, { useState } from "react";
import { createUserInFirebase } from "../FirebaseOperations";
import { User } from "../models/User";
import styles from "./Registration.module.css";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedBirthdate = formatDate(birthdate);

    const newUser = new User(
      null,
      username,
      password,
      formattedBirthdate,
      country,
      email
    );

    createUserInFirebase(newUser)
      .then((generatedUserId) => {
        setUserId(generatedUserId);
        console.log(
          "User registered successfully with userId:",
          generatedUserId
        );
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <div>
      <br></br>
      <br></br>
      <div className={styles.reg_container}>
        <h2 className={styles.reg_header}>Register</h2>
        <form className={styles.reg_form} onSubmit={handleSubmit}>
          <div>
            <label className={styles.reg_label}>Username :</label>
            <input
              type="text"
              name="username"
              className={styles.reg_input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.reg_label}>Email :</label>
            <input
              type="email"
              name="email"
              className={styles.reg_input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.reg_label}>Password :</label>
            <div style={{ display: "flex" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={styles.reg_passwordInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.reg_toggleButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <label className={styles.reg_label}>Birthdate :</label>
            <input
              type="date"
              name="birthdate"
              className={styles.reg_dateInput}
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.reg_label}>Country :</label>
            <input
              type="text"
              name="country"
              className={styles.reg_input}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.reg_submitButton}>
            Register
          </button>
        </form>

        {userId && <p>User ID: {userId}</p>}
      </div>
    </div>
  );
};

export default Registration;

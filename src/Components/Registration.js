import React, { useState } from "react";
import { User } from "../models/User";

const Registration = () => {
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    password: "",
    birthdate: "",
    country: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userId, username, password, birthdate, country, email } = formData;
    const newUser = new User(
      userId,
      username,
      password,
      birthdate,
      country,
      email
    );

    newUser
      .save()
      .then(() => {
        alert("User registered successfully!");
        setFormData({
          userId: "",
          username: "",
          password: "",
          birthdate: "",
          country: "",
          email: "",
        });
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        alert("There was an error registering the user.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>UserID:</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Birthdate:</label>
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;

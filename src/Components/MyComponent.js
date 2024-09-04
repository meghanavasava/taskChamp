import React from "react";
import { User } from "../models/User";
import { Task } from "../models/Task";

const MyComponent = () => {
  const handleClick = async () => {
    try {
      const userId = `user_${Date.now()}`;
      const user = new User(
        userId,
        "Khushi Patel",
        "khushi123",
        "13-04-2004",
        "India"
      );

      await user.save();
      console.log("User created successfully!");

      const today = new Date().toLocaleDateString("en-GB");

      const task = new Task(
        `task_${Date.now()}`,
        today,
        "Sample Task2",
        "Medium",
        false
      );

      await task.save(userId);
      console.log("Task added successfully!");

      task.is_done = true;
      await task.update(userId);
      console.log("Task updated successfully!");

      user.streak.addDate(today);
      console.log("Streak updated successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Hello, world!</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default MyComponent;
